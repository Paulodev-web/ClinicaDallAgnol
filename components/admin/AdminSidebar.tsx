"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, DollarSign, BarChart3, ArrowLeft, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/financeiro", label: "Financeiro", icon: DollarSign },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white shadow-xl flex flex-col z-40">
      <Link
        href="/admin"
        className="flex items-center gap-3 px-6 py-6 border-b border-slate-700/80 hover:bg-slate-800/50 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <span className="font-bold text-lg block">Clínica Dall&apos;Agnol</span>
          <span className="text-xs text-slate-400">Painel Admin</span>
        </div>
      </Link>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700/80 space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm text-left"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Link>
      </div>
    </aside>
  );
}
