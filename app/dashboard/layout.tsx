import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950 lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-zinc-900/50">
        <div className="min-h-full bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900">
          {children}
        </div>
      </main>
    </div>
  );
}
