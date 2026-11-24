import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";
import { PENDING_PAGES } from "@/domains/landing/content/pending-pages";

const content = PENDING_PAGES.login;

export const metadata: Metadata = { title: content.title };

export default function LoginPage() {
  return <PendingPage {...content} />;
}
