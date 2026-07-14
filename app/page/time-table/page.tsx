'use client'

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TimeTable from "../../component/TimeTable";
import { Calendar, Period } from "../../type";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ModalContext } from "@/app/context/Modal";
import SaveCalendar from "@/app/component/SaveCalendar";
import { W_LocDSNhomTo } from "@/app/util/W_LocDSNhomTo";
import { W_FormatDS } from "@/app/util/W_FormatDS";
import { v4 as uuidv4 } from 'uuid';
import { getCals, markTimeTableVisited, saveCal } from "@/app/util/Storage";
import { ToastContext } from "@/app/context/Toast";

type Subject = {
    id: string;
    name: string;
    numberOfCredit: string;
    groups: Period[];
}

const normalize = (s: string) =>
    s.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

var calendar: Calendar[][] = [
    [{ val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }], // Thu 2
    [{ val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }], // Thu 3
    [{ val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }], // Thu 4
    [{ val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }], // Thu 5
    [{ val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }], // Thu 6
    [{ val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }, { val: 0, subject: null }], // Thu 7
];

const TimeTablePage = () => {
    const router = useRouter();
    const modalContext = useContext(ModalContext);
    const toastContext = useContext(ToastContext);
    const cls = useRef<W_LocDSNhomTo | null>(null);
    const [dsNTs, setDsNTs] = useState<Period[]>([]);
    const [cal, setCal] = useState<Calendar[][]>(calendar);
    const [selectedPeriods, setSelectedPeriods] = useState<Period[]>([]);

    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [selectedSubjectIds, setSelectedSubjectIds] = useState<Set<string>>(new Set());
    const [selectedGroups, setSelectedGroups] = useState<Record<string, Period>>({});
    const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);

    const searchRef = useRef<HTMLInputElement | null>(null);
    const searchBoxRef = useRef<HTMLDivElement | null>(null);

    const [isOpenList, setIsOpenList] = useState<boolean>(true);

    const [isOpenSave, setIsOpenSave] = useState<boolean>(false);

    useEffect(() => {
        markTimeTableVisited();
    }, []);

    useEffect(() => {
        if (!cls.current) {
            cls.current = new W_LocDSNhomTo();
            const wFormatDS = new W_FormatDS();

            const ds_mon_hoc = cls.current.ds_mon_hoc;
            const ds_nhom_to = cls.current.ds_nhom_to;

            setDsNTs(ds_nhom_to.map((nt) => {
                const mon_hoc = ds_mon_hoc.find((mh) => mh.ma === nt.ma_mon);
                const schedule = wFormatDS.convert(nt.tkb);

                return {
                    id: mon_hoc?.ma || "",
                    name: mon_hoc?.ten || "",
                    numberOfCredit: nt.so_tc,
                    group: nt.nhom_to,
                    class: schedule,
                    sl_cp: nt.sl_cp,
                    sl_dk: nt.sl_dk,
                    sl_cl: nt.sl_cl,
                };
            }));
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                searchBoxRef.current &&
                !searchBoxRef.current.contains(e.target as Node)
            ) {
                setIsSearch(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    // Loc cac mon hoc dua theo tieu chi ma mon hoc, ten
    const filteredSubjects = useMemo(() => {
        if (!search.trim()) return subjects;
        const q = normalize(search.trim());
        return subjects.filter(
            (s) => normalize(s.id).includes(q) || normalize(s.name).includes(q)
        );
    }, [subjects, search]);

    // Chon mon hoc
    const selectedSubjects = useMemo(
        () => subjects.filter((s) => selectedSubjectIds.has(s.id)),
        [subjects, selectedSubjectIds]
    );

    // Tu dong tim kiem cac nhom dua vao mon hoc
    const activeSubject = useMemo(
        () => subjects.find((s) => s.id === activeSubjectId) ?? null,
        [subjects, activeSubjectId]
    );

    // Chon/an mon hoc
    const toggleSubject = (subjectId: string) => {
        const isSelected = selectedSubjectIds.has(subjectId);

        setSelectedSubjectIds((prev) => {
            const next = new Set(prev);
            if (isSelected) {
                next.delete(subjectId);
            } else {
                next.add(subjectId);
            }
            return next;
        });

        if (isSelected) {
            setSelectedGroups((prev) => {
                const rest = { ...prev };
                delete rest[subjectId];
                return rest;
            });
            if (activeSubjectId === subjectId) setActiveSubjectId(null);
        } else {
            setActiveSubjectId(subjectId);
        }
    }

    // Xoa mon hoc
    const removeSubject = (subjectId: string) => {
        setSelectedSubjectIds((prev) => {
            const next = new Set(prev);
            next.delete(subjectId);
            return next;
        });
        setSelectedGroups((prev) => {
            const rest = { ...prev };
            delete rest[subjectId];
            return rest;
        });
        const gp = dsNTs.find(nt => nt.id === subjectId);
        if (gp) {
            handleRemovePeriod(gp);
        }
        if (activeSubjectId === subjectId) setActiveSubjectId(null);
    }

    const handleSave = () => {
        setIsOpenSave(true);
    }

    const handleChoosePeriod = (gp: Period) => {
        const schedule = gp.class.schedule;
        let calendarTmp: Calendar[][] = cal.map(row => row.map(cell => ({ ...cell })));
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

            if (!isAccept) {
                break;
            }

            calSche[start].val = end - start;
            calSche[start].subject = gp;
            for (let i = start + 1; i < end; i++) {
                calSche[i].val = -1;
                calSche[i].subject = null;

            }

            calendarTmp[dateOfWeek - 2] = calSche;
        }

        if (!isAccept) {
            modalContext?.openModal({ title: "Trùng lịch", message: "Nhóm tổ này đã trùng với lịch hiện tại. Vui lòng chọn nhóm tổ khác hoặc xóa môn khác" });
            return;
        }

        setCal(calendarTmp);
        setSelectedPeriods(prev => [...prev, gp]);
    }

    const handleRemovePeriod = (gp: Period) => {
        const schedule = gp.class.schedule;
        let calendarTmp: Calendar[][] = cal.map(row => row.map(cell => ({ ...cell })));

        for (const [key, value] of Object.entries(schedule)) {
            const dateOfWeek = Number(key);
            const start = value.start - 1;
            const end = value.end - 1;

            const calSche = cal[dateOfWeek - 2];

            for (let i = start; i < end; i++) {
                calSche[i].val = 0;
                calSche[start].subject = null;

            }

            calendarTmp[dateOfWeek - 2] = calSche;
        }

        setCal(calendarTmp);
        setSelectedPeriods(selectedPeriods.filter(p => p.id !== gp.id && p.group === gp.group));
    }

    const handleSaveTimeTable = (name: string, calendar: Calendar[][]) => {
        let id = uuidv4();
        const ls = getCals();
        while (ls.some((item) => item.id === id)) {
            id = uuidv4();
        }

        const result = saveCal(id, calendar, name);
        if (result) {
            toastContext?.openToast({ type: "success", message: "Lưu thời gian biểu thành công" });
            setIsOpenSave(false);
            router.push(`/page/time-table/${id}`);
        } else {
            toastContext?.openToast({ type: "error", message: "Có lỗi, vui lòng thử lại sau" });
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-5">
                <div className="space-y-5">
                    <h1 className="font-semibold text-slate-800">
                        Sắp xếp thời khóa biểu
                        <span className="ml-2 font-normal text-sm text-slate-400">
                            · {cls.current?.ds.data.hoc_ky_dang_ky}
                        </span>
                    </h1>

                    <div className="flex items-center gap-3">
                        <p className="font-semibold text-slate-800">Tìm kiếm môn học</p>

                        <div className="relative flex-1" ref={searchBoxRef}>
                            <SearchIcon
                                sx={{ fontSize: 16 }}
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                value={search}
                                ref={searchRef}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setIsSearch(true);
                                }}
                                onFocus={() => setIsSearch(true)}
                                placeholder="Tìm theo mã hoặc tên môn"
                                className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-colors"
                            />

                            {isSearch && (
                                <div className="absolute w-full mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-15">
                                    <div className="flex items-center justify-between bg-slate-50 border-b border-slate-100 px-3 py-2">
                                        <p className="text-xs text-slate-500">
                                            Tìm thấy{" "}
                                            <span className="font-semibold text-slate-700">
                                                {filteredSubjects.length}
                                            </span>{" "}
                                            môn học
                                        </p>
                                    </div>

                                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                                        {filteredSubjects.map((s) => {
                                            const isSelected = selectedSubjectIds.has(s.id);
                                            return (
                                                <button
                                                    key={s.id}
                                                    onClick={() => {
                                                        toggleSubject(s.id);
                                                        setIsSearch(false);
                                                    }}
                                                    className={`w-full text-left px-3 py-2.5 flex items-center gap-2 transition-colors ${isSelected
                                                        ? "bg-slate-50 hover:bg-slate-100"
                                                        : "hover:bg-slate-50"
                                                        }`}
                                                >
                                                    <div className="min-w-0 flex-1 space-y-0.5">
                                                        <p className="text-sm font-medium text-slate-800 truncate">
                                                            {s.name}
                                                        </p>
                                                        <p className="text-xs text-slate-400 truncate">
                                                            Mã: {s.id}
                                                        </p>
                                                    </div>
                                                    {isSelected && (
                                                        <span className="flex items-center justify-center h-4 w-4 rounded-full bg-slate-700 shrink-0">
                                                            <CheckIcon
                                                                sx={{ fontSize: 10 }}
                                                                className="text-white"
                                                            />
                                                        </span>
                                                    )}
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
                            )}
                        </div>

                        <button className="text-sm border border-gray-300 w-9 h-9 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <span className="flex items-center justify-center">
                                <CachedIcon sx={{ fontSize: 18 }} />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <h1 className="font-semibold text-slate-800">
                            Danh sách nhóm tổ
                        </h1>
                        <button onClick={() => setIsOpenList(prev => !prev)}>
                            {isOpenList && (<KeyboardArrowDownIcon />)}
                            {!isOpenList && (<KeyboardArrowUpIcon />)}
                        </button>
                    </div>

                    {isOpenList && (
                        <div className="rounded border border-slate-200 bg-white overflow-x-auto">
                            <div className="grid grid-cols-45 border-b border-gray-300">
                                <div className="col-span-2 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Chọn
                                </div>
                                <div className="col-span-3 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Mã
                                </div>
                                <div className="col-span-9 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Tên môn
                                </div>
                                <div className="col-span-3 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Số TC
                                </div>
                                <div className="col-span-2 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Nhóm
                                </div>
                                <div className="col-span-4 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Số lượng
                                </div>
                                <div className="col-span-9 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Giảng viên
                                </div>
                                <div className="col-span-3 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Thứ
                                </div>
                                <div className="col-span-3 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Tiết BĐ
                                </div>
                                <div className="col-span-3 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                    Tiết KT
                                </div>
                                <div className="col-span-4 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Phòng học
                                </div>
                            </div>

                            <div>
                                {activeSubject === null && (
                                    <div className="grid grid-cols-45">
                                        <div className="col-span-45 px-3 py-3 text-center italic text-xs font-semibold tracking-wide text-slate-500">
                                            <p>Chưa có dữ liệu nhóm tổ môn học</p>
                                        </div>
                                    </div>
                                )}

                                {activeSubject !== null && activeSubject.groups.map((gp, idx) => (
                                    <div key={idx} className={`grid grid-cols-45 ${idx < activeSubject.groups.length - 1 && "border-b border-gray-300"}`}>
                                        <div className="col-span-2 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            <input type="checkbox"
                                                checked={(() => {
                                                    const existing = selectedPeriods.find(p => p.id === gp.id && p.group === gp.group);
                                                    return !!existing;
                                                })()}

                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        handleChoosePeriod(gp);
                                                    } else {
                                                        handleRemovePeriod(gp);
                                                    }
                                                }} />
                                        </div>
                                        <div className="col-span-3 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            {gp.id}
                                        </div>
                                        <div className="col-span-9 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            <p>{gp.name}</p>
                                        </div>
                                        <div className="col-span-3 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            <p>{gp.numberOfCredit}</p>
                                        </div>
                                        <div className="col-span-2 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            <p>{gp.group}</p>
                                        </div>
                                        <div className="col-span-4 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            <p>{gp.sl_cl}/{gp.sl_cp}</p>
                                        </div>
                                        <div className="col-span-9 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            {gp.class.teachers.map((t, idx) => (
                                                <div key={idx}>
                                                    <p>{t}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col-span-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            {Object.keys(gp.class.schedule).map((s, idx) => (
                                                <div key={idx} className={`px-3 py-3 ${idx < Object.keys(gp.class.schedule).length - 1 && "border-b border-gray-300"}`}>
                                                    <p>Thứ {s}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col-span-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            {Object.keys(gp.class.schedule).map((s, idx) => {
                                                const schedule = gp.class.schedule[Number(s)];
                                                return (
                                                    <div key={idx} className={`px-3 py-3 ${idx < Object.keys(gp.class.schedule).length - 1 && "border-b border-gray-300"}`}>
                                                        <p>{schedule.start}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="col-span-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-r border-gray-300">
                                            {Object.keys(gp.class.schedule).map((s, idx) => {
                                                const schedule = gp.class.schedule[Number(s)];
                                                return (
                                                    <div key={idx} className={`px-3 py-3 ${idx < Object.keys(gp.class.schedule).length - 1 && "border-b border-gray-300"}`}>
                                                        <p>{schedule.end}</p>
                                                    </div>
                                                )
                                            })}</div>
                                        <div className="col-span-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            {gp.class.positions.map((p, idx) => (
                                                <div key={idx} className={`px-3 py-3 ${idx < gp.class.positions.length - 1 && "border-b border-gray-300"}`}>
                                                    <p>{p}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedSubjects.length > 0 && (
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <h2 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2.5">
                        Môn đã chọn ({selectedSubjects.length})
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {selectedSubjects.map((s) => {
                            const chosen = selectedGroups[s.id];
                            return (
                                <div
                                    key={s.id}
                                    className={`flex items-center gap-1.5 rounded-lg border pl-3 pr-1.5 py-1 text-xs transition-colors ${activeSubjectId === s.id
                                        ? "border-slate-400 bg-slate-50"
                                        : "border-slate-200"
                                        }`}
                                >
                                    <button
                                        onClick={() => setActiveSubjectId(s.id)}
                                        className="font-medium text-slate-700 max-w-40 truncate"
                                    >
                                        {s.name}
                                        {chosen && (
                                            <span className="ml-1 text-slate-400">
                                                · Nhóm {chosen.group}
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => removeSubject(s.id)}
                                        aria-label={`Bỏ chọn ${s.name}`}
                                        className="rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                                    >
                                        <CloseIcon sx={{ fontSize: 14 }} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <TimeTable calendar={cal} numberOfCourse={selectedPeriods.length} numberOfCredit={selectedPeriods.reduce((val, p) => Number(p.numberOfCredit) ?? 0 + val, 0)} />

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="rounded-lg cursor-pointer border border-slate-300 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
                >
                    Lưu thời khóa biểu
                </button>
            </div>

            {isOpenSave && (
                <SaveCalendar
                    calendar={cal}
                    numberOfCourse={selectedPeriods.length}
                    numberOfCredit={selectedPeriods.reduce((val, p) => Number(p.numberOfCredit) ?? 0 + val, 0)}
                    onSaveCalendar={handleSaveTimeTable}
                    onClose={() => setIsOpenSave(false)}
                />
            )}
        </main>
    );
};

export default TimeTablePage;