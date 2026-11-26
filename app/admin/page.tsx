import { redirect } from "next/navigation";
import { ADMIN_SESSION } from "@/lib/auth/session-tokens";

export default function AdminIndexPage() {
  redirect(ADMIN_SESSION.homePath);
}
