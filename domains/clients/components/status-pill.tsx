import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CLIENT_STATUS_LABELS,
  DELIVERY_STATUS_LABELS,
  INVITATION_STATE_LABELS,
  MEMBERSHIP_STATUS_LABELS,
  TONE_CLASSES,
} from "../content/client-labels";
import type {
  ClientMembership,
  ClientStatus,
  DeliveryStatus,
  InvitationState,
} from "../types/client.types";

function StatusPill({ label, tone }: { label: string; tone: keyof typeof TONE_CLASSES }) {
  return <Badge className={cn("h-6 px-2.5", TONE_CLASSES[tone])}>{label}</Badge>;
}

export const ClientStatusBadge = ({ status }: { status: ClientStatus }) => (
  <StatusPill {...CLIENT_STATUS_LABELS[status]} />
);

export const InvitationStateBadge = ({ state }: { state: InvitationState }) => (
  <StatusPill {...INVITATION_STATE_LABELS[state]} />
);

export const DeliveryStatusBadge = ({ status }: { status: DeliveryStatus }) => (
  <StatusPill {...DELIVERY_STATUS_LABELS[status]} />
);

export const MembershipStatusBadge = ({ status }: { status: ClientMembership["status"] }) => (
  <StatusPill {...MEMBERSHIP_STATUS_LABELS[status]} />
);
