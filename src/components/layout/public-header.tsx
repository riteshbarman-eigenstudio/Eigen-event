import Link from "next/link";
import { publicNav } from "@/config/nav";
import { Button } from "@/vendor/untitledui/base/button";
import { Logo } from "./logo";

export function PublicHeader({ cta = true }: { cta?: boolean }) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" aria-label="Eigen Event home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Page">
          {publicNav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-gray-600 hover:text-gray-900">
              {n.label}
            </a>
          ))}
        </nav>
        {cta && (
          <Button href="#tickets" size="sm">
            Get tickets
          </Button>
        )}
      </div>
    </header>
  );
}
