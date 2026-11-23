import { Badge } from "@/vendor/untitledui/base/badge";
import type { AgendaSession } from "@/types";

export function AgendaPreview({ sessions }: { sessions: AgendaSession[] }) {
  return (
    <section id="agenda" className="border-y border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <h2 className="text-h2 font-semibold text-gray-900">Agenda</h2>
        <ul className="mt-8 divide-y divide-gray-200 rounded-lg border border-gray-200">
          {sessions.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center gap-x-6 gap-y-1 px-6 py-4">
              <span className="w-14 text-sm font-semibold text-gray-900">{s.time}</span>
              <div className="min-w-0 flex-1">
                <p className="text-md font-medium text-gray-900">{s.title}</p>
                <p className="text-sm text-gray-500">{s.speaker}</p>
              </div>
              <Badge>{s.room}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
