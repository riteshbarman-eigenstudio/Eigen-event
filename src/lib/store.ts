"use client";

// Browser-side demo store (localStorage). Lets the whole flow work without a backend:
// create event -> add tickets -> publish -> public page -> register -> registrations/attendees.
import { useSyncExternalStore } from "react";
import type { Attendee, EmailCampaign, EventItem, EventStatus, Order, Registration, TicketType } from "@/types";

interface State {
  events: EventItem[];
  tickets: Record<string, TicketType[]>; // added tickets per event id
  registrations: Registration[];
  emails: EmailCampaign[];
  imported: Record<string, Attendee[]>; // attendees imported from CSV per event id
}

const KEY = "eigen-event-demo-v1";
const EMPTY: State = { events: [], tickets: {}, registrations: [], emails: [], imported: {} };

let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...EMPTY, ...(JSON.parse(raw) as State) };
  } catch {
    // ignore corrupt or blocked storage
  }
}

function commit(next: State) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // storage may be blocked; state still lives in memory
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function getSnapshot() {
  load();
  return state;
}
function getServerSnapshot() {
  return EMPTY;
}

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** False during server render and hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

// ---------- derived data ----------

function withStats(base: EventItem, s: State): EventItem {
  const regs = s.registrations.filter((r) => r.eventId === base.id);
  const imported = s.imported?.[base.id]?.length ?? 0;
  if (regs.length === 0 && imported === 0) return base;
  return {
    ...base,
    registered: base.registered + imported + regs.reduce((n, r) => n + r.qty, 0),
    revenue: base.revenue + regs.reduce((n, r) => n + r.total, 0),
  };
}

function allBase(s: State): EventItem[] {
  return s.events;
}

function eventTickets(base: EventItem, s: State): TicketType[] {
  const list = s.tickets[base.id] ?? [];
  const regs = s.registrations.filter((r) => r.eventId === base.id);
  return list.map((t) => {
    const extra = regs.reduce((n, r) => n + r.lines.filter((l) => l.ticketId === t.id).reduce((m, l) => m + l.qty, 0), 0);
    const sold = t.sold + extra;
    return { ...t, sold, status: sold >= t.total ? "sold-out" : t.status };
  });
}

export function useEvents(): EventItem[] {
  const s = useStore();
  return allBase(s).map((e) => withStats(e, s));
}

/** Look an event up by id or slug. `ready` is false until local data has loaded. */
export function useEventLookup(idOrSlug: string): { event: EventItem | undefined; ready: boolean } {
  const s = useStore();
  const ready = useHydrated();
  const base = allBase(s).find((e) => e.id === idOrSlug || e.slug === idOrSlug);
  return { event: base ? withStats(base, s) : undefined, ready };
}

export function useEventTickets(event: EventItem | undefined): TicketType[] {
  const s = useStore();
  const base = event && allBase(s).find((e) => e.id === event.id);
  return base ? eventTickets(base, s) : [];
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function useEventOrders(event: EventItem): Order[] {
  const s = useStore();
  const mine: Order[] = s.registrations
    .filter((r) => r.eventId === event.id)
    .map((r) => ({
      id: r.id,
      buyer: r.buyer,
      email: r.email,
      items: r.lines.map((l) => `${l.qty} x ${l.name}`).join(", "),
      total: r.total,
      status: "paid" as const,
      date: fmtDate(r.createdAt),
    }))
    .reverse();
  void event;
  return mine;
}

export function useEventAttendees(event: EventItem): Attendee[] {
  const s = useStore();
  const mine: Attendee[] = [];
  for (const r of s.registrations.filter((x) => x.eventId === event.id)) {
    let n = 0;
    for (const l of r.lines) {
      for (let i = 0; i < l.qty; i++) {
        n++;
        mine.push({
          id: `${r.id}-${n}`,
          name: n === 1 ? r.buyer : `${r.buyer} (guest ${n - 1})`,
          email: r.email,
          company: "-",
          ticket: l.name,
          status: "registered",
          source: "Event page",
        });
      }
    }
  }
  return [...mine.reverse(), ...(s.imported?.[event.id] ?? [])];
}

/** Registrations per week for the last 12 weeks (oldest first). */
export function useWeeklyRegistrations(event: EventItem): number[] {
  const s = useStore();
  const weeks = Array<number>(12).fill(0);
  const now = Date.now();
  for (const r of s.registrations.filter((x) => x.eventId === event.id)) {
    const ago = Math.floor((now - new Date(r.createdAt).getTime()) / (7 * 864e5));
    if (ago >= 0 && ago < 12) weeks[11 - ago] += r.qty;
  }
  return weeks;
}

export function useRegistration(id: string): { registration: Registration | undefined; event: EventItem | undefined; ready: boolean } {
  const s = useStore();
  const ready = useHydrated();
  const registration = s.registrations.find((r) => r.id === id);
  const base = registration && allBase(s).find((e) => e.id === registration.eventId);
  return { registration, event: base, ready };
}

// ---------- actions ----------

function slugify(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugTaken(slug: string) {
  load();
  return allBase(state).some((e) => e.slug === slug);
}

export interface NewEventInput {
  name: string;
  tagline: string;
  date: string;
  time: string;
  timezone: string;
  format: EventItem["format"];
  city: string;
  capacity: number;
  ticketName: string;
  price: number;
  quantity: number;
  slug: string;
  visibility: NonNullable<EventItem["visibility"]>;
  publish: boolean;
}

export function createEvent(input: NewEventInput): EventItem {
  load();
  const id = `evt_${Date.now().toString(36)}`;
  let slug = slugify(input.slug) || slugify(input.name) || id;
  if (slugTaken(slug)) slug = `${slug}-${id.slice(-4)}`;
  const event: EventItem = {
    id,
    slug,
    name: input.name.trim(),
    tagline: input.tagline.trim() || "Join us for an unforgettable event.",
    startsAt: `${input.date}T${input.time || "09:00"}:00`,
    city: input.city.trim() || (input.format === "virtual" ? "Online" : "To be announced"),
    format: input.format,
    status: input.publish ? "on-sale" : "draft",
    capacity: input.capacity,
    registered: 0,
    revenue: 0,
    checkedIn: 0,
    created: true,
    visibility: input.visibility,
    timezone: input.timezone,
  };
  const ticket: TicketType = {
    id: `${id}_t1`,
    name: input.ticketName.trim() || "General admission",
    kind: input.price > 0 ? "paid" : "free",
    price: input.price,
    sold: 0,
    total: input.quantity,
    status: "on-sale",
    waitlist: 0,
  };
  commit({ ...state, events: [event, ...state.events], tickets: { ...state.tickets, [id]: [ticket] } });
  return event;
}

export function setEventStatus(id: string, status: EventStatus) {
  load();
  commit({ ...state, events: state.events.map((e) => (e.id === id ? { ...e, status } : e)) });
}

export function addTicket(eventId: string, t: { name: string; price: number; total: number }) {
  load();
  const ticket: TicketType = {
    id: `${eventId}_t${Date.now().toString(36)}`,
    name: t.name.trim(),
    kind: t.price > 0 ? "paid" : "free",
    price: t.price,
    sold: 0,
    total: t.total,
    status: "on-sale",
    waitlist: 0,
  };
  commit({ ...state, tickets: { ...state.tickets, [eventId]: [...(state.tickets[eventId] ?? []), ticket] } });
}

export function registerForEvent(eventId: string, buyer: string, email: string, lines: Registration["lines"]): Registration {
  load();
  const reg: Registration = {
    id: `R${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
    eventId,
    buyer: buyer.trim(),
    email: email.trim(),
    lines,
    qty: lines.reduce((n, l) => n + l.qty, 0),
    total: lines.reduce((n, l) => n + l.qty * l.price, 0),
    createdAt: new Date().toISOString(),
  };
  commit({ ...state, registrations: [...state.registrations, reg] });
  return reg;
}

export function importAttendees(eventId: string, rows: { name: string; email: string; company: string; ticket: string }[]) {
  load();
  const stamp = Date.now().toString(36);
  const added: Attendee[] = rows.map((r, i) => ({
    id: `imp-${stamp}-${i}`,
    name: r.name,
    email: r.email,
    company: r.company || "-",
    ticket: r.ticket || "General admission",
    status: "registered",
    source: "CSV import",
  }));
  commit({ ...state, imported: { ...(state.imported ?? {}), [eventId]: [...(state.imported?.[eventId] ?? []), ...added] } });
  return added.length;
}

export function useEventEmails(eventId: string): EmailCampaign[] {
  const s = useStore();
  return (s.emails ?? []).filter((e) => e.eventId === eventId).reverse();
}

/** Demo send: nothing leaves the browser; the email is saved to the event's sent list. */
export function sendEmail(eventId: string, subject: string, recipients: string[], html: string): EmailCampaign {
  load();
  const email: EmailCampaign = {
    id: `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
    eventId,
    subject: subject.trim(),
    recipients,
    html,
    sentAt: new Date().toISOString(),
  };
  commit({ ...state, emails: [...(state.emails ?? []), email] });
  return email;
}
