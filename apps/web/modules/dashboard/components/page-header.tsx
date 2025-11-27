import { ClipboardList } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-600/20" />
      
      <div className="relative px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <ClipboardList className="h-9 w-9 text-white" strokeWidth={2} />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {title}
              </h1>
              <p className="mt-1.5 text-blue-100/90 text-base font-medium">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <div className="rounded-lg bg-white/10 backdrop-blur-sm px-4 py-2">
              <div className="text-xs font-medium text-blue-100">AG Grid Enterprise</div>
              <div className="text-sm font-semibold text-white mt-0.5">Advanced Features</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm px-4 py-2">
              <div className="text-xs font-medium text-blue-100">Next.js 15</div>
              <div className="text-sm font-semibold text-white mt-0.5">App Router</div>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
