'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import calendarImage from "@/app/image/calendar.png";
import { ModalContext } from "@/app/context/Modal";
import { ToastContext } from "@/app/context/Toast";
import { deleteCal, getCals, hasVisitedTimeTable } from "@/app/util/Storage";
import { Calendar } from "@/app/type";

type SavedCalendar = {
    id: string;
    name?: string;
    cal: Calendar[][];
}

const DEFAULT_VISIBLE = 3;

export default function HomePage() {
    const router = useRouter();
    const modalContext = useContext(ModalContext);
    const toastContext = useContext(ToastContext);
    const [savedCalendars, setSavedCalendars] = useState<SavedCalendar[]>([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        setSavedCalendars(getCals());
    }, []);

    useEffect(() => {
        if (!hasVisitedTimeTable()) {
            router.replace("/page/time-table");
        }
    }, [router]);

    const visibleCalendars = useMemo(() => {
        return showAll ? savedCalendars : savedCalendars.slice(0, DEFAULT_VISIBLE);
    }, [savedCalendars, showAll]);

    const handleDelete = async (calendar: SavedCalendar) => {
        const confirmed = await modalContext?.waitModal({
            title: "Xóa thời khóa biểu",
            message: `Bạn có chắc chắn muốn xóa "${calendar.name || "thời khóa biểu này"}" không?`,
        });

        if (!confirmed) return;

        const result = deleteCal(calendar.id);
        if (result) {
            setSavedCalendars((prev) => prev.filter((item) => item.id !== calendar.id));
            toastContext?.openToast({ type: "success", message: "Xóa thời khóa biểu thành công" });
        } else {
            toastContext?.openToast({ type: "error", message: "Xóa thời khóa biểu thất bại" });
        }
    };

    return (
        <section className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-10 bg-slate-900"></div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                        SGU Sort
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                        Sắp xếp thời khóa biểu thông minh, nhanh và dễ nhìn.
                    </h1>
                </div>
                <p className="mt-3 text-base leading-7 text-slate-600">
                    SGU Sort giúp bạn chọn môn học, thử các nhóm tổ và lưu lại lịch học của mình chỉ trong vài thao tác.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href="/page/time-table"
                        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                        Tạo lịch mới
                    </Link>
                    <Link
                        href="/page/donation"
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                    >
                        Đóng góp dự án
                    </Link>
                </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                        Lịch đã lưu của bạn
                    </h1>
                    {savedCalendars.length > 0 && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                            {savedCalendars.length} lịch
                        </span>
                    )}
                </div>

                {savedCalendars.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                        </span>
                        <p className="text-sm text-slate-500">Bạn chưa có thời khóa biểu nào được lưu.</p>
                        <Link
                            href="/page/time-table"
                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                        >
                            Tạo lịch đầu tiên
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                            <Link
                                href="/page/time-table"
                                className="flex h-full min-h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 transition hover:border-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-current">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </span>
                                <span className="text-xs font-medium">Thêm lịch mới</span>
                            </Link>

                            {visibleCalendars.map((calendar, index) => (
                                <div
                                    key={calendar.id}
                                    className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                                >
                                    <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-slate-400 via-slate-700 to-slate-400 opacity-0 transition-opacity group-hover:opacity-100" />

                                    <div className="relative h-28 flex justify-center items-center bg-white">
                                        <img
                                            src={calendarImage.src}
                                            alt={calendar.name || "Thời khóa biểu"}
                                            className="h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                        />
                                        <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80 text-[11px] font-semibold text-white">
                                            {index + 1}
                                        </span>
                                    </div>

                                    <div className="space-y-3 p-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-sm font-semibold text-slate-800 line-clamp-2">
                                                {calendar.name || "Thời khóa biểu chưa đặt tên"}
                                            </p>
                                            <button
                                                onClick={() => handleDelete(calendar)}
                                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                                aria-label="Xóa"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                                                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                                                </svg>
                                            </button>
                                        </div>
                                        <Link
                                            href={`/page/time-table/${calendar.id}`}
                                            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700"
                                        >
                                            Mở lịch
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                                                <path d="M5 12h14M13 6l6 6-6 6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {savedCalendars.length > DEFAULT_VISIBLE && (
                            <button
                                onClick={() => setShowAll((prev) => !prev)}
                                className="mx-auto flex items-center gap-1 rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                            >
                                {showAll ? "Thu gọn" : `Xem thêm ${savedCalendars.length - DEFAULT_VISIBLE} lịch`}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={`h-3.5 w-3.5 transition-transform ${showAll ? "rotate-180" : ""}`}
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}