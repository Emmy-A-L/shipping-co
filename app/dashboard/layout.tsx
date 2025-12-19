// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { LayoutDashboard, Package, CreditCard, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      
      <div className="container flex flex-1 gap-8">
        <aside className="hidden bg-[#000080] w-64 shrink-0 flex-col gap-2 px-2 py-3 md:flex">
          <img src="dreamtrust_logo.svg" alt="DreamTrust Shipping Logo" className="w-14 h-14" />
          <div className="mb-4 px-4 py-2 font-semibold text-slate-900">Account</div>
          <nav className="grid gap-1 text-sm font-medium text-slate-600">
              <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-2 text-slate-900 transition-colors hover:text-slate-900">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>
            <Link href="/dashboard/tracking" className="flex items-center gap-3 rounded-lg px-4 py-2 transition-colors hover:bg-slate-100 hover:text-slate-900">
              <Package className="h-4 w-4" />
              Shipments
            </Link>
            <Link href="/dashboard/payments" className="flex items-center gap-3 rounded-lg px-4 py-2 transition-colors hover:bg-slate-100 hover:text-slate-900">
              <CreditCard className="h-4 w-4" />
              Payments
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-4 py-2 transition-colors hover:bg-slate-100 hover:text-slate-900">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
          <div className="mt-auto border-t pt-4">
             <Link href="/login" className="flex items-center gap-3 rounded-lg px-4 py-2 text-red-600 transition-colors hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Link>
          </div>
        </aside>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
