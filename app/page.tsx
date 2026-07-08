'use client'

import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import calendarImage from "@/app/image/calendar.png";
import { ModalContext } from "@/app/context/Modal";
import { ToastContext } from "@/app/context/Toast";
import { deleteCal, getCals } from "@/app/util/Storage";
import { Calendar } from "@/app/type";

type SavedCalendar = {
    id: string;
    name?: string;
    cal: Calendar[][];
}

const DEFAULT_VISIBLE = 3;

export default function HomePage() {
    const modalContext = useContext(ModalContext);
    const toastContext = useContext(ToastContext);
    const [savedCalendars, setSavedCalendars] = useState<SavedCalendar[]>([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        setSavedCalendars(getCals());
    }, []);

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
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                    SGU Sort
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    Sắp xếp thời khóa biểu thông minh, nhanh và dễ nhìn.
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
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

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Lịch đã lưu</p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                Mở lại các thời khóa biểu bạn đã tạo trước đây để xem hoặc chỉnh sửa ngay.
                            </p>
                        </div>
                        {savedCalendars.length > DEFAULT_VISIBLE && (
                            <button
                                onClick={() => setShowAll((prev) => !prev)}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                            >
                                {showAll ? "Thu gọn" : "Xem thêm"}
                            </button>
                        )}
                    </div>

                    {savedCalendars.length === 0 ? (
                        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                            Bạn chưa có thời khóa biểu nào được lưu.
                        </div>
                    ) : (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {visibleCalendars.map((calendar) => (
                                <div key={calendar.id} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                    <img
                                        src={calendarImage.src}
                                        alt={calendar.name || "Thời khóa biểu"}
                                        className="h-28 w-full object-cover"
                                    />
                                    <div className="space-y-3 p-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-sm font-semibold text-slate-800 line-clamp-2">
                                                {calendar.name || "Thời khóa biểu chưa đặt tên"}
                                            </p>
                                            <button
                                                onClick={() => handleDelete(calendar)}
                                                className="rounded-full border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <Link
                                                href={`/page/time-table/${calendar.id}`}
                                                className="text-sm font-medium text-slate-700 hover:text-slate-900"
                                            >
                                                Xem chi tiết
                                            </Link>
                                            <Link
                                                href={`/page/time-table/${calendar.id}`}
                                                className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700"
                                            >
                                                Mở lịch
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">Tạo lịch mới</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Bắt đầu từ đầu với từng môn học và nhóm tổ phù hợp để tạo một thời khóa biểu hoàn chỉnh.
                    </p>
                    <Link
                        href="/page/time-table"
                        className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                        Bắt đầu sắp xếp
                    </Link>
                </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                            Về SGU Sort
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                            Giúp bạn sắp xếp lịch học rõ ràng, tiết kiệm thời gian và ít sai sót.
                        </h2>
                        <p className="mt-3 text-base leading-7 text-slate-600">
                            Bạn có thể thử nhiều nhóm tổ, kiểm tra xung đột lịch và lưu lại các phiên bản khác nhau để chọn phương án phù hợp nhất.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-slate-900">Sẵn sàng tạo lịch mới?</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Khởi động một thời khóa biểu mới ngay hôm nay và lưu lại những cấu hình bạn thích.
                        </p>
                        <Link
                            href="/page/time-table"
                            className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                        >
                            Tạo lịch mới ngay
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
