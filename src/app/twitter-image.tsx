import { ogSize, renderOg } from "@/lib/og";

export const alt = "Eigen Event: every event, one platform";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Every event. One platform.", subtitle: "Plan it, take registrations, run the day and see the numbers.", eyebrow: "Event management" });
}
