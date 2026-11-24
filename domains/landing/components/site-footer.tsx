import Link from "next/link";
import { ZewaLogo } from "@/components/brand/zewa-logo";
import { FOOTER } from "../content/final-cta";
import { FOOTER_NAV } from "../content/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto w-full max-w-[1280px] px-5 pb-8 pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 pb-12 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <ZewaLogo tone="onDark" />
            <p className="max-w-sm type-body text-white/70">{FOOTER.description}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {FOOTER_NAV.map((group) => (
              <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
                <h2 className="type-eyebrow text-white">{group.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="type-body text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="border-t border-navy-line pt-6 type-small text-white/70">{FOOTER.copyright}</div>
      </div>
    </footer>
  );
}
