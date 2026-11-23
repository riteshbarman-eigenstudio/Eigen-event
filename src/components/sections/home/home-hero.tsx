import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/vendor/untitledui/base/button";
import { Badge } from "@/vendor/untitledui/base/badge";

export function HomeHero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-24 text-center md:py-32">
      <Badge>MVP preview</Badge>
      <h1 className="text-display font-semibold tracking-tight text-gray-900">Every event. One platform.</h1>
      <p className="max-w-2xl text-h3 text-gray-600">
        Plan it, take registrations, run the day and see the numbers, all in a single place built for organizers.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/events" size="lg" iconTrailing={ArrowRight}>
          Open dashboard
        </Button>
        <Button href="/events/new" size="lg" color="secondary">
          Create an event
        </Button>
      </div>
    </section>
  );
}
