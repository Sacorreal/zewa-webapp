import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Feature extends IconItem {
  highlighted?: boolean;
}

export interface Pillar {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  capabilities: string[];
}

export interface ProcessStep extends IconItem {
  order: number;
}

export interface Audience {
  icon: LucideIcon;
  title: string;
  description: string;
}

export type StatusTone = "success" | "warning" | "neutral";

export interface StatusLabel {
  label: string;
  tone: StatusTone;
}

export interface TimelineEvent {
  date: string;
  title: string;
  actor: string;
  status: StatusLabel;
  document: string;
}
