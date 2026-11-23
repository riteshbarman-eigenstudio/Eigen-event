import { ogSize, renderOg } from "@/lib/og";

export const alt = "Event registration on Eigen Event";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Register for this event", subtitle: "Reserve your spot on Eigen Event.", eyebrow: "Event" });
}
