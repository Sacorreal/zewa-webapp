import { BUDGET_CHAPTERS, CONTRACTS, FINANCE } from "../../content/mockups";
import { StatusBadge } from "../status-badge";
import { MockupCard, MockupFrame } from "./mockup-frame";

export function FinanceMockup() {
  return (
    <MockupFrame caption="Dashboard financiero ilustrativo con ejecución presupuestal y contratos." section="Finanzas / Presupuesto" activeItem="Finanzas" withSidebar>
      <div className="grid grid-cols-1 gap-2.5">
        <MockupCard>
          <div className="flex items-center justify-between">
            <p className="font-heading text-xs font-bold text-navy">{FINANCE.title}</p>
            <span className="text-[10px] font-semibold text-petrol">{FINANCE.summary}</span>
          </div>
          <div className="mt-3 flex h-24 items-end gap-3" aria-hidden="true">
            {BUDGET_CHAPTERS.map((chapter) => (
              <div key={chapter.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span className="text-[9px] font-semibold text-navy">{chapter.percent}%</span>
                <div
                  className="w-full max-w-7 rounded-t-sm bg-petrol/85"
                  style={{ height: `${chapter.percent}%` }}
                />
                <span className="w-full truncate text-center text-[9px] text-ink-soft">{chapter.label}</span>
              </div>
            ))}
          </div>
        </MockupCard>

        <MockupCard className="p-0">
          <table className="w-full text-left text-[10px]">
            <thead className="border-b border-line text-ink-soft">
              <tr>
                <th className="px-3 py-2 font-semibold">Contratista</th>
                <th className="hidden px-3 py-2 font-semibold md:table-cell">Vence</th>
                <th className="px-3 py-2 text-right font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {CONTRACTS.map((contract) => (
                <tr key={contract.vendor}>
                  <td className="px-3 py-2">
                    <p className="font-semibold text-navy">{contract.vendor}</p>
                    <p className="text-ink-soft">{contract.object}</p>
                  </td>
                  <td className="hidden px-3 py-2 text-ink md:table-cell">{contract.due}</td>
                  <td className="px-3 py-2 text-right">
                    <StatusBadge status={contract.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MockupCard>
      </div>
    </MockupFrame>
  );
}
