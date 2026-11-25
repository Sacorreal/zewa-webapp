/* eslint-disable @next/next/no-img-element -- vista previa local (object URL) */
"use client";

import { ImagePlus, Trash2 } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { ZewaSymbol } from "@/components/brand/zewa-symbol";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { LOGO_ACCEPT_ATTRIBUTE } from "../../validations/client.schema";

interface LogoFieldProps {
  file: File | undefined;
  onFileChange: (file: File | undefined) => void;
  /** Logo ya guardado (edición). */
  currentUrl?: string | null;
  removed?: boolean;
  onRemove?: () => void;
  error?: string;
  disabled?: boolean;
}

const HINT = "Opcional. PNG, JPG o WEBP de hasta 5 MB. Sin logo se usa el símbolo de ZEWA.";

export function LogoField({
  file,
  onFileChange,
  currentUrl,
  removed = false,
  onRemove,
  error,
  disabled,
}: LogoFieldProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = useObjectUrl(file);
  const shownUrl = preview ?? (removed ? null : (currentUrl ?? null));
  const hasLogo = Boolean(shownUrl);

  function clear() {
    if (inputRef.current) inputRef.current.value = "";
    onFileChange(undefined);
    if (currentUrl && !removed) onRemove?.();
  }

  return (
    <FormField id={id} label="Logo del conjunto" error={error} hint={HINT}>
      <div className="flex items-center gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-subtle">
          {shownUrl ? (
            <img src={shownUrl} alt="Vista previa del logo" className="size-full object-contain" />
          ) : (
            <ZewaSymbol className="size-12" />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={LOGO_ACCEPT_ATTRIBUTE}
            className="sr-only"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={`${id}-message`}
            onChange={(event) => onFileChange(event.target.files?.[0] ?? undefined)}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus data-icon="inline-start" aria-hidden="true" />
            {hasLogo ? "Cambiar logo" : "Subir logo"}
          </Button>
          {hasLogo && (
            <Button type="button" variant="ghost" size="sm" disabled={disabled} onClick={clear}>
              <Trash2 data-icon="inline-start" aria-hidden="true" />
              Quitar
            </Button>
          )}
        </div>
      </div>
    </FormField>
  );
}

/**
 * URL temporal para previsualizar el archivo. Se deriva durante el render al
 * cambiar el archivo y se libera cuando se reemplaza o al desmontar.
 */
function useObjectUrl(file: File | undefined): string | null {
  const [preview, setPreview] = useState<{ file?: File; url: string | null }>({ url: null });

  if (preview.file !== file) {
    setPreview({ file, url: file ? URL.createObjectURL(file) : null });
  }

  useEffect(() => {
    const { url } = preview;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [preview]);

  return preview.url;
}
