import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AdminHeader } from "./_components/AdminHeader";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Solvyn Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <AdminHeader />
        {children}
      </div>
    </ThemeProvider>
  );
}
