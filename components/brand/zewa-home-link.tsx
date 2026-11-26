import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { ZewaLogo } from "./zewa-logo";

const HOME_PATH = "/";

type ZewaHomeLinkProps = Pick<ComponentProps<typeof ZewaLogo>, "tone" | "wordmarkClassName"> & {
  className?: string;
};

export function ZewaHomeLink({ tone, wordmarkClassName, className }: ZewaHomeLinkProps) {
  return (
    <Link
      href={HOME_PATH}
      aria-label="ZEWA, ir al inicio"
      className={cn("inline-flex w-fit rounded-lg", className)}
    >
      <ZewaLogo tone={tone} wordmarkClassName={wordmarkClassName} />
    </Link>
  );
}
