// Demo data. Replaced by database queries in src/lib/db once the backend lands.
import type {
  AgendaSession,
  Attendee,
  Campaign,
  EventItem,
  Integration,
  Order,
  PromoCode,
  Speaker,
  TeamMember,
  TicketType,
  TrafficSource,
} from "@/types";

// No demo events: events are created by the user in the app.
export const events: EventItem[] = [];

export const tickets: TicketType[] = [
  { id: "t1", name: "General admission", kind: "paid", price: 49, sold: 412, total: 500, status: "on-sale", waitlist: 0 },
  { id: "t2", name: "Workshop pass", kind: "paid", price: 129, sold: 96, total: 150, status: "on-sale", waitlist: 0 },
  { id: "t3", name: "VIP, all access", kind: "vip", price: 399, sold: 60, total: 60, status: "sold-out", waitlist: 38 },
  { id: "t4", name: "Community (free)", kind: "free", price: 0, sold: 716, total: 800, status: "on-sale", waitlist: 0 },
];

export const promoCodes: PromoCode[] = [
  { code: "EARLYBIRD", discount: "20% off", used: 212, limit: 300, active: true },
  { code: "SPEAKER100", discount: "100% off", used: 24, limit: 30, active: true },
  { code: "PARTNER15", discount: "₹15 off", used: 41, limit: 100, active: false },
];

export const orders: Order[] = [
  { id: "#1042", buyer: "Asha Rao", email: "asha@brightlabs.example", items: "1 x General admission", total: 49, status: "paid", date: "22 Nov 2026" },
  { id: "#1041", buyer: "Marco Silva", email: "marco@nova.example", items: "1 x VIP, all access", total: 399, status: "paid", date: "22 Nov 2026" },
  { id: "#1040", buyer: "Lin Zhou", email: "lin@orbit.example", items: "2 x Workshop pass", total: 258, status: "pending", date: "21 Nov 2026" },
  { id: "#1039", buyer: "Tara Nair", email: "tara@pixel.example", items: "1 x General admission", total: 49, status: "refunded", date: "20 Nov 2026" },
  { id: "#1038", buyer: "Dev Patel", email: "dev@stack.example", items: "3 x General admission", total: 147, status: "paid", date: "19 Nov 2026" },
];

export const attendees: Attendee[] = [
  { id: "a1", name: "Asha Rao", email: "asha@brightlabs.example", company: "Bright Labs", ticket: "General admission", status: "registered", source: "Email" },
  { id: "a2", name: "Marco Silva", email: "marco@nova.example", company: "Nova", ticket: "VIP, all access", status: "checked-in", source: "Referral" },
  { id: "a3", name: "Lin Zhou", email: "lin@orbit.example", company: "Orbit", ticket: "Workshop pass", status: "pending", source: "LinkedIn" },
  { id: "a4", name: "Tara Nair", email: "tara@pixel.example", company: "Pixel", ticket: "General admission", status: "registered", source: "Direct" },
  { id: "a5", name: "Dev Patel", email: "dev@stack.example", company: "Stack", ticket: "General admission", status: "checked-in", source: "Email" },
  { id: "a6", name: "Sara Khan", email: "sara@loop.example", company: "Loop", ticket: "Workshop pass", status: "registered", source: "Referral" },
];

export const speakers: Speaker[] = [
  { id: "s1", name: "Priya Menon", title: "CEO, Northwind", topic: "The next decade of events" },
  { id: "s2", name: "Dev Patel", title: "CTO, Stack", topic: "Scaling live platforms" },
  { id: "s3", name: "Sara Khan", title: "Head of Growth, Loop", topic: "Pricing that converts" },
  { id: "s4", name: "Mei Tan", title: "Design Lead, Orbit", topic: "Design clinics" },
];

export const agenda: AgendaSession[] = [
  { id: "g1", time: "09:00", title: "Opening keynote", speaker: "Priya Menon", room: "Main hall" },
  { id: "g2", time: "10:00", title: "Scaling live platforms", speaker: "Dev Patel", room: "Main hall" },
  { id: "g3", time: "10:00", title: "Workshop: pricing", speaker: "Sara Khan", room: "Room A" },
  { id: "g4", time: "11:00", title: "Design clinic", speaker: "Mei Tan", room: "Room A" },
];

export const campaigns: Campaign[] = [
  { id: "c1", name: "Early-bird announcement", channel: "Email", audience: "All contacts", status: "sent", openRate: 48, date: "12 Nov 2026" },
  { id: "c2", name: "Agenda is live", channel: "Email", audience: "Registered", status: "sent", openRate: 61, date: "18 Nov 2026" },
  { id: "c3", name: "One week to go", channel: "Email", audience: "Registered", status: "scheduled", date: "7 Mar 2027" },
  { id: "c4", name: "Doors open reminder", channel: "SMS", audience: "Registered", status: "draft", date: "14 Mar 2027" },
];

export const team: TeamMember[] = [
  { id: "m1", name: "Ritesh Sharma", email: "ritesh@eigenevent.example", role: "Owner" },
  { id: "m2", name: "Neha Iyer", email: "neha@eigenevent.example", role: "Manager" },
  { id: "m3", name: "Karan Shah", email: "karan@eigenevent.example", role: "Finance" },
  { id: "m4", name: "Ana Costa", email: "ana@eigenevent.example", role: "Door staff" },
];

export const integrations: Integration[] = [
  { id: "i1", name: "Stripe", description: "Accept cards and wallets.", connected: true },
  { id: "i2", name: "Razorpay", description: "Accept UPI and local cards.", connected: false },
  { id: "i3", name: "Zoom", description: "Stream sessions to online guests.", connected: false },
  { id: "i4", name: "Google Calendar", description: "Add sessions to attendee calendars.", connected: true },
  { id: "i5", name: "Mailchimp", description: "Sync contacts and campaigns.", connected: false },
  { id: "i6", name: "Zapier", description: "Send events to 5,000+ apps.", connected: false },
];

export const salesByWeek = [12, 18, 15, 26, 34, 29, 41, 46, 55, 52, 68, 78];

export const trafficSources: TrafficSource[] = [
  { name: "Email", share: 38 },
  { name: "LinkedIn", share: 27 },
  { name: "Referral", share: 21 },
  { name: "Direct", share: 14 },
];

export function getEvent(idOrSlug: string): EventItem | undefined {
  return events.find((e) => e.id === idOrSlug || e.slug === idOrSlug);
}
