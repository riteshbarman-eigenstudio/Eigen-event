import type { Metadata } from "next";
import { TutorialPage } from "@/components/pages/tutorial-page";

export const metadata: Metadata = { title: "Tutorial" };

export default function Page() {
  return <TutorialPage />;
}
