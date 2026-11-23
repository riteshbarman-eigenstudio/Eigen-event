import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 md:flex-row md:items-center md:px-8">
        <Logo className="text-md" />
        <p className="text-sm text-gray-500">Ticketing and event management by Eigen Event.</p>
      </div>
    </footer>
  );
}
