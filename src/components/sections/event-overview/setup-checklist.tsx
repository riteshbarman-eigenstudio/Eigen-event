import { CheckCircle } from "@untitledui/icons";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { cx } from "@/vendor/untitledui/utils/cx";

const tasks = [
  { label: "Create the event", done: true, slug: "/settings" },
  { label: "Add ticket types", done: true, slug: "/tickets" },
  { label: "Connect a payment provider", done: true, slug: "/settings" },
  { label: "Send the first announcement", done: false, slug: "/messaging" },
  { label: "Invite door staff", done: false, slug: "/check-in" },
];

export function SetupChecklist({ eventId }: { eventId: string }) {
  return (
    <Card>
      <CardHeader title="Launch checklist" description={`${tasks.filter((t) => t.done).length} of ${tasks.length} done`} />
      <CardBody>
        <ul className="flex flex-col gap-4">
          {tasks.map((t) => (
            <li key={t.label} className="flex items-center gap-3">
              <CheckCircle className={cx("size-5", t.done ? "text-brand-600" : "text-gray-300")} />
              <Link href={`/events/${eventId}${t.slug}`} className={cx("text-sm font-medium", t.done ? "text-gray-500 line-through" : "text-gray-900 hover:underline")}>
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
