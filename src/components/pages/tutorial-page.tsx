import { PageHeader } from "@/components/layout/page-header";
import { TutorialTour } from "@/components/sections/tutorial/tutorial-tour";

export function TutorialPage() {
  return (
    <>
      <PageHeader
        title="Tutorial"
        description="Learn how to create your first conference, step by step."
      />
      <TutorialTour />
    </>
  );
}
