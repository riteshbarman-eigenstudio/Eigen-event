import {
  BarChart01,
  Calendar,
  Home01,
  LayoutAlt01,
  Mail01,
  Microphone01,
  QrCode01,
  Settings01,
  Star01,
  Ticket01,
  Users01,
  VideoRecorder,
  Zap,
  Building07,
  Clock,
  File06,
  BookOpen01,
} from "@untitledui/icons";
import type { ComponentType } from "react";

export type Icon = ComponentType<{ className?: string }>;
export interface NavItem {
  label: string;
  href: string;
  icon: Icon;
}

/** Organisation-level sidebar. */
export const mainNav: NavItem[] = [
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Contacts", href: "/contacts", icon: Users01 },
  { label: "Integrations", href: "/integrations", icon: Zap },
  { label: "Tutorial", href: "/tutorial", icon: BookOpen01 },
  { label: "Team", href: "/team", icon: Building07 },
  { label: "Settings", href: "/settings", icon: Settings01 },
];

/** Event-level tabs (shown inside /events/[eventId]). `slug` is appended to the event URL. */
export const eventNav: { label: string; slug: string; icon: Icon; phase: 1 | 2 }[] = [
  { label: "Overview", slug: "", icon: Home01, phase: 1 },
  { label: "Tickets", slug: "/tickets", icon: Ticket01, phase: 1 },
  { label: "Registrations", slug: "/orders", icon: File06, phase: 1 },
  { label: "Attendees", slug: "/attendees", icon: Users01, phase: 1 },
  { label: "Check-in", slug: "/check-in", icon: QrCode01, phase: 1 },
  { label: "Messaging", slug: "/messaging", icon: Mail01, phase: 1 },
  { label: "Analytics", slug: "/analytics", icon: BarChart01, phase: 1 },
  { label: "Page builder", slug: "/page-builder", icon: LayoutAlt01, phase: 2 },
  { label: "Agenda", slug: "/agenda", icon: Clock, phase: 2 },
  { label: "Speakers", slug: "/speakers", icon: Microphone01, phase: 2 },
  { label: "Sponsors", slug: "/sponsors", icon: Star01, phase: 2 },
  { label: "Virtual", slug: "/virtual", icon: VideoRecorder, phase: 2 },
  { label: "Settings", slug: "/settings", icon: Settings01, phase: 1 },
];

export const publicNav = [
  { label: "Overview", href: "#overview" },
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Tickets", href: "#tickets" },
];
