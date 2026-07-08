'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";

const navItems = [
    { href: "/", label: "Trang chủ", icon: HomeOutlinedIcon },
    { href: "/page/time-table", label: "Sắp xếp môn học", icon: CalendarMonthOutlinedIcon },
    { href: "/page/donation", label: "Đóng góp", icon: VolunteerActivismOutlinedIcon },
];

export default function AppShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
                <div className="mx-auto flex container items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-sm">
                            SGU
                        </div>
                        <div>
                            <p className="text-base font-semibold tracking-tight text-slate-900">SGU SORT</p>
                            <p className="text-xs text-slate-500">Sắp xếp thời khóa biểu thông minh</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-2 md:flex">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition ${isActive
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                >
                                    <Icon sx={{ fontSize: 18 }} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </header>

            <main className="mx-auto container w-full min-h-screen py-10">
                {children}
            </main>

            <footer className="border-t border-slate-200 bg-white/80">
                <div className="mx-auto flex container flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <p>© 2026 SGU SORT. Thiết kế cho việc sắp xếp thời khóa biểu.</p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/" className="hover:text-slate-900">
                            Trang chủ
                        </Link>
                        <Link href="/page/time-table" className="hover:text-slate-900">
                            Sắp xếp môn học
                        </Link>
                        <Link href="/page/donation" className="hover:text-slate-900">
                            Đóng góp
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
