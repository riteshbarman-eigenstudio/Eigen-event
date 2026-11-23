import { Avatar } from "@/vendor/untitledui/base/avatar";
import type { Speaker } from "@/types";

export function SpeakersGrid({ speakers }: { speakers: Speaker[] }) {
  return (
    <section id="speakers" className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <h2 className="text-h2 font-semibold text-gray-900">Speakers</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {speakers.map((s) => (
          <div key={s.id} className="flex flex-col gap-4">
            <Avatar name={s.name} size="lg" />
            <div>
              <h3 className="text-md font-semibold text-gray-900">{s.name}</h3>
              <p className="text-sm text-gray-600">{s.title}</p>
              <p className="mt-1 text-sm text-gray-500">{s.topic}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
