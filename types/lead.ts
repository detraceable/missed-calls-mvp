/**
 * Shared types for lead capture (funnel + SMS widget).
 * Used by the API and client components.
 */

export type LeadSource = "funnel" | "widget";

export type FunnelService = "emergency" | "maintenance" | "quote" | "question";

export type FunnelDrill =
  | "asap"
  | "today"
  | "this_week"
  | "small"
  | "medium"
  | "large";

export interface FunnelLeadPayload {
  source: "funnel";
  phone: string;
  service: FunnelService;
  drill?: FunnelDrill | null;
}

export interface WidgetLeadPayload {
  source: "widget";
  name: string;
  phone: string;
  message: string;
}

export type LeadPayload = FunnelLeadPayload | WidgetLeadPayload;

export type LeadRecord = LeadPayload & {
  id: string;
  createdAt: string; // ISO
};

export interface ApiLeadResponse {
  success: boolean;
  error?: string;
}
