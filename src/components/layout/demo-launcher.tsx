"use client";

import { PlayCircle } from "@untitledui/icons";
import { Button } from "@/vendor/untitledui/base/button";

/** "Demo" navbar button. Opens the guided app demo (public/demo.html) as its own full page. */
export function DemoLauncher({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <Button color="secondary" size={size} iconLeading={PlayCircle} onClick={() => window.location.assign("/demo.html")} data-tour="demo-btn">
      Demo
    </Button>
  );
}
