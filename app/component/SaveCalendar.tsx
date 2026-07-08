'use client'

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import { ModalContext } from '../context/Modal';
import { Calendar } from '../type';

type SaveCalendarProps = {
    calendar: Calendar[][];
    numberOfCourse: number;
    numberOfCredit: number;

    onSaveCalendar: (name: string, calendar: Calendar[][]) => void;
    onClose: () => void;
}

type SubmitForm = {
    name: string;
}

const SaveCalendar = ({ calendar, numberOfCourse, numberOfCredit, onSaveCalendar, onClose }: SaveCalendarProps) => {
    const modalContext = useContext(ModalContext);
    const [submitForm, setSubmitForm] = useState<SubmitForm>({ name: "" });

    const handleSaveCalendar = async () => {
        const wait = await modalContext?.waitModal({ title: "Xác nhận tạo thời gian biểu mới", message: "Khi ấn xác nhận sẽ lưu thời gian biểu này lại, bạn có thể thay đổi lại sau nếu bạn muốn. Bạn có chắc chắn hay không ?" });
        if (!wait) return;
        onSaveCalendar(submitForm.name, calendar);
    }

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-sm bg-white shadow-xl space-y-5 overflow-hidden animate-modal-in">
                <div className="flex items-center justify-between bg-slate-800 text-white px-5 py-2 text-[16px]">
                    <h1>Thêm thời gian biểu</h1>

                    <button className="cursor-pointer" onClick={onClose}>
                        <CloseIcon sx={{ fontSize: 16 }} />
                    </button>
                </div>
                <div className="px-5 pb-5 space-y-2">
                    <div className="relative flex-1">
                        <EditCalendarIcon
                            sx={{ fontSize: 16 }}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            value={submitForm.name}
                            onChange={(e) => setSubmitForm({ name: e.target.value })}
                            placeholder="Tên thời gian biểu"
                            className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs italic">Thông tin thời gian biểu mới</p>
                        <p className="flex gap-2">
                            <span className="px-4 py-1 bg-gray-200 rounded text-xs">{numberOfCourse} môn</span>
                            <span className="px-4 py-1 bg-gray-200 rounded text-xs">{numberOfCredit} tín chỉ</span>
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 mt-5">
                        <button className="rounded border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50" onClick={onClose}>
                            Hủy
                        </button>
                        <button className="rounded bg-slate-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
                            onClick={handleSaveCalendar}
                        >
                            Thêm
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SaveCalendar;