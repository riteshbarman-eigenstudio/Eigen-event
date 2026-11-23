export type EventStatus = "draft" | "on-sale" | "live" | "ended";
export type EventFormat = "in-person" | "virtual" | "hybrid";

export interface EventItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  startsAt: string; // ISO
  city: string;
  format: EventFormat;
  status: EventStatus;
  capacity: number;
  registered: number;
  revenue: number; // USD
  checkedIn: number;
}

export interface TicketType {
  id: string;
  name: string;
  kind: "free" | "paid" | "vip";
  price: number;
  sold: number;
  total: number;
  status: "on-sale" | "sold-out" | "scheduled";
  waitlist: number;
}

export interface PromoCode {
  code: string;
  discount: string;
  used: number;
  limit: number;
  active: boolean;
}

export interface Order {
  id: string;
  buyer: string;
  email: string;
  items: string;
  total: number;
  status: "paid" | "pending" | "refunded";
  date: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  company: string;
  ticket: string;
  status: "registered" | "checked-in" | "pending";
  source: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  topic: string;
}

export interface AgendaSession {
  id: string;
  time: string;
  title: string;
  speaker: string;
  room: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: "Email" | "SMS";
  audience: string;
  status: "sent" | "scheduled" | "draft";
  openRate?: number;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Finance" | "Door staff" | "Volunteer";
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
}

export interface TrafficSource {
  name: string;
  share: number;
}
