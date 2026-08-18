'use client';

export default function TopBar() {
  return (
    <header className="flex items-center justify-end px-5 py-3 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-900 leading-tight">Jonas Frey</p>
          <p className="text-xs text-gray-400 leading-tight">Klasse 10A · S2024001</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-school-primary text-white text-xs font-bold shrink-0">
          JF
        </div>
      </div>
    </header>
  );
}
