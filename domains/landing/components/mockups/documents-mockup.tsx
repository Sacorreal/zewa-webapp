import { FileText, Folder } from "lucide-react";
import { DOCUMENT_CATEGORIES, DOCUMENT_FILES } from "../../content/mockups";
import { StatusBadge } from "../status-badge";
import { MockupCard, MockupFrame } from "./mockup-frame";

export function DocumentsMockup() {
  return (
    <MockupFrame caption="Expediente digital ilustrativo organizado por categorías y documentos." section="Expedientes / Repositorio" activeItem="Expedientes" withSidebar>
      <div className="grid grid-cols-1 gap-2.5">
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {DOCUMENT_CATEGORIES.map((category) => (
            <MockupCard key={category.label} className="flex items-center gap-2">
              <Folder className="size-4 shrink-0 text-petrol" aria-hidden="true" />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-navy">{category.label}</p>
                <p className="text-[10px] text-ink-soft">{category.count} archivos</p>
              </div>
            </MockupCard>
          ))}
        </div>

        <MockupCard>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-soft">Documentos recientes</p>
          <ul className="mt-2 flex flex-col divide-y divide-line">
            {DOCUMENT_FILES.map((file) => (
              <li key={file.name} className="flex items-center gap-2.5 py-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-sage text-petrol">
                  <FileText className="size-3.5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-navy">{file.name}</p>
                  <p className="text-[10px] text-ink-soft">{file.meta}</p>
                </div>
                <StatusBadge status={file.status} />
              </li>
            ))}
          </ul>
        </MockupCard>
      </div>
    </MockupFrame>
  );
}
