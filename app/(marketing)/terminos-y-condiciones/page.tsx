import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";
import { PENDING_PAGES } from "@/domains/landing/content/pending-pages";

const content = PENDING_PAGES.terms;

export const metadata: Metadata = { title: content.title };

export default function TermsPage() {
  return <PendingPage {...content} />;
}
