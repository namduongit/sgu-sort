'use client'

import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import TimeTable from '@/app/component/TimeTable';
import { deleteCal, getCalById, updateCal } from '@/app/util/Storage';
import { Calendar, Period } from '@/app/type';
import { W_LocDSNhomTo } from '@/app/util/W_LocDSNhomTo';
import { W_FormatDS } from '@/app/util/W_FormatDS';
import { ModalContext } from '@/app/context/Modal';
import { ToastContext } from '@/app/context/Toast';

type Subject = {
    id: string;
    name: string;
    numberOfCredit: string;
    groups: Period[];
}

const normalize = (s: string) =>
    s.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

const getSelectedPeriodsFromCalendar = (calendarData: Calendar[][]): Period[] => {
    const selected = new Map<string, Period>();

    calendarData.forEach((row) => {
        row.forEach((cell) => {
            if (cell.val > 0 && cell.subject) {
                const key = `${cell.subject.id}-${cell.subject.group}`;
                if (!selected.has(key)) {
                    selected.set(key, cell.subject);
                }
            }
        });
    });

    return Array.from(selected.values());
};

const TimeTableDetailPage = () => {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const modalContext = useContext(ModalContext);
    const toastContext = useContext(ToastContext);
    const cls = useRef<W_LocDSNhomTo | null>(null);

    const [calendar, setCalendar] = useState<Calendar[][] | null>(null);
    const [name, setName] = useState<string>('');
    const [dsNTs, setDsNTs] = useState<Period[]>([]);
    const [selectedPeriods, setSelectedPeriods] = useState<Period[]>([]);
    const [search, setSearch] = useState('');
    const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);

    const savedCalendar = useMemo(() => {
        if (!params?.id) return null;
        return getCalById(params.id);
    }, [params?.id]);

    useEffect(() => {
        if (!cls.current) {
            cls.current = new W_LocDSNhomTo();
            const wFormatDS = new W_FormatDS();
            const ds_mon_hoc = cls.current.ds_mon_hoc;
            const ds_nhom_to = cls.current.ds_nhom_to;

            setDsNTs(
                ds_nhom_to.map((nt) => {
                    const mon_hoc = ds_mon_hoc.find((mh) => mh.ma === nt.ma_mon);
                    const schedule = wFormatDS.convert(nt.tkb);

                    return {
                        id: mon_hoc?.ma || '',
                        name: mon_hoc?.ten || '',
                        numberOfCredit: nt.so_tc,
                        group: nt.nhom_to,
                        class: schedule,
                        sl_cp: nt.sl_cp,
                        sl_dk: nt.sl_dk,
                        sl_cl: nt.sl_cl,
                    };
                })
            );
        }
    }, []);

    useEffect(() => {
        if (savedCalendar) {
            setCalendar(savedCalendar.cal);
            setName(savedCalendar.name ?? '');
            setSelectedPeriods(getSelectedPeriodsFromCalendar(savedCalendar.cal));
        }
    }, [savedCalendar]);

    const subjects = useMemo<Subject[]>(() => {
        const map = new Map<string, Subject>();
        dsNTs.forEach((nt) => {
            if (!map.has(nt.id)) {
                map.set(nt.id, { id: nt.id, name: nt.name, numberOfCredit: nt.numberOfCredit, groups: [] });
            }
            map.get(nt.id)!.groups.push(nt);
        });
        return Array.from(map.values());
    }, [dsNTs]);

    const filteredSubjects = useMemo(() => {
        if (!search.trim()) return subjects;
        const q = normalize(search.trim());
        return subjects.filter((s) => normalize(s.id).includes(q) || normalize(s.name).includes(q));
    }, [subjects, search]);

    const activeSubject = useMemo(() => subjects.find((s) => s.id === activeSubjectId) ?? null, [subjects, activeSubjectId]);

    // Mã các môn đã có ít nhất 1 nhóm tổ được chọn -> để hiển thị dấu tick trong danh sách
    const selectedSubjectIds = useMemo(
        () => new Set(selectedPeriods.map((p) => p.id)),
        [selectedPeriods]
    );

    // Danh sách môn đã chọn, kèm nhóm tổ tương ứng, dùng cho khối "Môn đã chọn"
    const selectedSubjects = useMemo(() => {
        return subjects
            .filter((s) => selectedSubjectIds.has(s.id))
            .map((s) => ({
                subject: s,
                periods: selectedPeriods.filter((p) => p.id === s.id),
            }));
    }, [subjects, selectedSubjectIds, selectedPeriods]);

    const handleChoosePeriod = (gp: Period) => {
        if (!calendar) return;

        const exists = selectedPeriods.some((p) => p.id === gp.id && p.group === gp.group);
        if (exists) {
            handleRemovePeriod(gp);
            return;
        }

        const schedule = gp.class.schedule;
        let calendarTmp: Calendar[][] = calendar.map((row) => row.map((cell) => ({ ...cell })));
        let isAccept = true;

        for (const [key, value] of Object.entries(schedule)) {
            const dateOfWeek = Number(key);
            const start = value.start - 1;
            const end = value.end - 1;
            const calSche = calendarTmp[dateOfWeek - 2];

            for (let i = start; i < end; i++) {
                if (calSche[i].val !== 0) {
                    isAccept = false;
                    break;
                }
            }

            if (!isAccept) break;

            calSche[start].val = end - start;
            calSche[start].subject = gp;
            for (let i = start + 1; i < end; i++) {
                calSche[i].val = -1;
                calSche[i].subject = null;
            }

            calendarTmp[dateOfWeek - 2] = calSche;
        }

        if (!isAccept) {
            modalContext?.openModal({ title: 'Trùng lịch', message: 'Nhóm tổ này trùng với lịch hiện tại. Hãy chọn nhóm tổ khác hoặc bỏ môn hiện có.' });
            return;
        }

        setCalendar(calendarTmp);
        setSelectedPeriods((prev) => [...prev, gp]);
    };

    const handleRemovePeriod = (gp: Period) => {
        if (!calendar) return;

        const schedule = gp.class.schedule;
        const calendarTmp: Calendar[][] = calendar.map((row) => row.map((cell) => ({ ...cell })));

        for (const [key, value] of Object.entries(schedule)) {
            const dateOfWeek = Number(key);
            const start = value.start - 1;
            const end = value.end - 1;
            const calSche = calendarTmp[dateOfWeek - 2];

            for (let i = start; i < end; i++) {
                calSche[i].val = 0;
            }

            calSche[start].subject = null;
            calendarTmp[dateOfWeek - 2] = calSche;
        }

        setCalendar(calendarTmp);
        setSelectedPeriods((prev) => prev.filter((p) => !(p.id === gp.id && p.group === gp.group)));
    };

    // Bỏ chọn toàn bộ nhóm tổ của một môn (dùng cho nút x trong khối "Môn đã chọn")
    const removeSubject = (subjectId: string) => {
        const periodsOfSubject = selectedPeriods.filter((p) => p.id === subjectId);
        periodsOfSubject.forEach((p) => handleRemovePeriod(p));
        if (activeSubjectId === subjectId) setActiveSubjectId(null);
    };

    const handleSaveChanges = () => {
        if (!calendar || !params?.id) return;
        const result = updateCal(params.id, calendar, name);
        if (result) {
            toastContext?.openToast({ type: 'success', message: 'Lưu thay đổi thành công' });
        } else {
            toastContext?.openToast({ type: 'error', message: 'Lưu thay đổi thất bại' });
        }
    };

    const handleDeleteCalendar = async () => {
        if (!params?.id) return;
        const confirmed = await modalContext?.waitModal({
            title: 'Xóa thời khóa biểu',
            message: 'Bạn có chắc chắn muốn xóa thời khóa biểu này không?',
        });

        if (!confirmed) return;

        const result = deleteCal(params.id);
        if (result) {
            toastContext?.openToast({ type: 'success', message: 'Xóa thời khóa biểu thành công' });
            router.push('/page/time-table');
        } else {
            toastContext?.openToast({ type: 'error', message: 'Xóa thời khóa biểu thất bại' });
        }
    };

    if (!calendar) {
        return (
            <main className="min-h-screen bg-slate-50 p-6">
                <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">
                    Không tìm thấy thời khóa biểu này.
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 p-6 space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                        onClick={() => router.push('/page/time-table')}
                        className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        <KeyboardArrowLeftIcon sx={{ fontSize: 18 }} />
                        Quay về
                    </button>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={handleSaveChanges}
                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                        >
                            Lưu thay đổi
                        </button>
                        <button
                            onClick={handleDeleteCalendar}
                            className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
                        >
                            Xóa lịch
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Tên thời khóa biểu</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên thời khóa biểu"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />
                </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-5">
                <div className="relative">
                    <SearchIcon sx={{ fontSize: 16 }} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm môn học để chỉnh sửa"
                        className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />
                </div>

                {selectedSubjects.length > 0 && (
                    <div>
                        <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Môn đã chọn ({selectedSubjects.length})
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {selectedSubjects.map(({ subject, periods }) => (
                                <div
                                    key={subject.id}
                                    className={`flex items-center gap-1.5 rounded-lg border pl-3 pr-1.5 py-1 text-xs transition-colors ${
                                        activeSubjectId === subject.id
                                            ? 'border-slate-400 bg-slate-50'
                                            : 'border-slate-200'
                                    }`}
                                >
                                    <button
                                        onClick={() => setActiveSubjectId(subject.id)}
                                        className="font-medium text-slate-700 max-w-40 truncate"
                                    >
                                        {subject.name}
                                        <span className="ml-1 text-slate-400">
                                            · Nhóm {periods.map((p) => p.group).join(', ')}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => removeSubject(subject.id)}
                                        aria-label={`Bỏ chọn ${subject.name}`}
                                        className="rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                                    >
                                        <CloseIcon sx={{ fontSize: 14 }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="mb-2 text-sm font-semibold text-slate-700">Danh sách môn</p>
                        <div className="max-h-72 space-y-2 overflow-y-auto">
                            {filteredSubjects.map((subject) => {
                                const isActive = subject.id === activeSubjectId;
                                const isChosen = selectedSubjectIds.has(subject.id);
                                return (
                                    <button
                                        key={subject.id}
                                        onClick={() => setActiveSubjectId(subject.id)}
                                        className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                                            isActive
                                                ? 'border-slate-400 bg-white'
                                                : isChosen
                                                ? 'border-slate-200 bg-emerald-100/60 hover:bg-white'
                                                : 'border-slate-200 bg-transparent hover:bg-white'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">{subject.name}</p>
                                                <p className="text-xs text-slate-400">Mã: {subject.id}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                {isChosen && (
                                                    <span className="flex items-center justify-center h-4 w-4 rounded-full bg-emerald-500">
                                                        <CheckIcon sx={{ fontSize: 10 }} className="text-white" />
                                                    </span>
                                                )}
                                                {isActive && <CheckIcon sx={{ fontSize: 16 }} className="text-slate-700" />}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}

                            {filteredSubjects.length === 0 && (
                                <p className="text-sm text-slate-400 text-center py-8">
                                    Không tìm thấy môn học phù hợp
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-3">
                        <p className="mb-2 text-sm font-semibold text-slate-700">Nhóm tổ có thể chọn</p>
                        {activeSubject ? (
                            <div className="space-y-2">
                                {activeSubject.groups.map((gp, idx) => {
                                    const isSelected = selectedPeriods.some((p) => p.id === gp.id && p.group === gp.group);
                                    return (
                                        <label
                                            key={`${gp.id}-${gp.group}-${idx}`}
                                            className={`flex cursor-pointer items-start justify-between gap-3 rounded-lg border px-3 py-2 transition-colors ${
                                                isSelected ? 'border-emerald-300 bg-emerald-50/60' : 'border-slate-200 hover:bg-slate-50'
                                            }`}
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">{gp.name}</p>
                                                <p className="text-xs text-slate-500">Nhóm {gp.group} · {gp.numberOfCredit} TC · {gp.sl_cl}/{gp.sl_cp} chỗ</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleChoosePeriod(gp)}
                                                className="mt-1 h-4 w-4 rounded border-slate-300"
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">Chọn một môn học để xem các nhóm tổ.</p>
                        )}
                    </div>
                </div>
            </div>

            <TimeTable
                calendar={calendar}
                numberOfCourse={selectedPeriods.length}
                numberOfCredit={selectedPeriods.reduce((sum, p) => sum + Number(p.numberOfCredit), 0)}
            />
        </main>
    );
};

export default TimeTableDetailPage;