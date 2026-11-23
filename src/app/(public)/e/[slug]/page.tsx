import type { Metadata } from "next";
import { PublicEventPage } from "@/components/pages/public-event-page";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Events are created in the browser, so the server uses generic share metadata.
  const title = "Event registration";
  const description = "Register for this event on Eigen Event.";
  return {
    title,
    description,
    alternates: { canonical: `/e/${slug}` },
    openGraph: { title, description, type: "website", url: `/e/${slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <PublicEventPage slug={slug} />;
}
