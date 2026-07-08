import SunnyIcon from '@mui/icons-material/Sunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { Calendar } from '../page/time-table/page';

type TimeTableProps = {
    calendar: Calendar[][];
    numberOfCourse: number;
    numberOfCredit: number;
}

const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
const MORNING = [1, 2, 3, 4, 5];
const AFTERNOON = [6, 7, 8, 9, 10];
const EVENING = [11, 12, 13];

const TIME_MORNING = ["07:00 - 07:50", "07:50 - 08:40", "09:00 - 09:50", "09:50 - 10:40", "10:40 - 11:30"];
const TIME_AFTERNOON = ["13:00 - 13:50", "13:50 - 14:40", "15:00 - 15:50", "15:50 - 16:40", "16:40 - 17:30"];
const TIME_EVENING = ["17:40 - 18:30", "18:30 - 19:20", "19:20 - 20:30"];

const COLOR_PALETTE = [
    { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-900", tag: "text-blue-500" },
    { bg: "bg-emerald-50", border: "border-emerald-500", text: "text-emerald-900", tag: "text-emerald-500" },
    { bg: "bg-amber-50", border: "border-amber-500", text: "text-amber-900", tag: "text-amber-500" },
    { bg: "bg-rose-50", border: "border-rose-500", text: "text-rose-900", tag: "text-rose-500" },
    { bg: "bg-violet-50", border: "border-violet-500", text: "text-violet-900", tag: "text-violet-500" },
    { bg: "bg-cyan-50", border: "border-cyan-500", text: "text-cyan-900", tag: "text-cyan-500" },
    { bg: "bg-orange-50", border: "border-orange-500", text: "text-orange-900", tag: "text-orange-500" },
    { bg: "bg-teal-50", border: "border-teal-500", text: "text-teal-900", tag: "text-teal-500" },
    { bg: "bg-fuchsia-50", border: "border-fuchsia-500", text: "text-fuchsia-900", tag: "text-fuchsia-500" },
    { bg: "bg-lime-50", border: "border-lime-600", text: "text-lime-900", tag: "text-lime-600" },
];

const hashStringToIndex = (str: string, mod: number) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % mod;
}

const getSubjectColor = (subjectId: string | undefined) => {
    if (!subjectId) return COLOR_PALETTE[0];
    const idx = hashStringToIndex(subjectId, COLOR_PALETTE.length);
    return COLOR_PALETTE[idx];
}

const TDCalendar = (cal: Calendar) => {
    if (cal.val < 0) {
        return;
    }

    if (cal.val > 0) {
        const color = getSubjectColor(cal.subject?.id);

        return (
            <td rowSpan={cal.val} className={`sticky text-sm left-0 z-10 rounded ${color.bg} border-l-3 ${color.border} px-4 py-3 font-medium text-slate-700 space-y-2`}>
                <p className={`font-semibold ${color.text}`}>{cal.subject?.name}</p>
                <div className={`${color.tag} text-xs space-y-1`}>
                    <p>Mã MH: {cal.subject?.id}</p>
                    <p>GV: {cal.subject?.class.teachers.join(", ")}</p>
                    <p>Phòng: {cal.subject?.class.positions.join(", ")}</p>
                </div>
            </td>
        )
    }

    return (
        <td className="sticky left-0 z-10 text-center bg-white px-4 py-3 font-medium text-slate-700">
            -
        </td>
    )
}

const TimeTable = ({ calendar, numberOfCourse, numberOfCredit }: TimeTableProps) => {
    return (
        <div className="w-full">
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <div className="ps-5 pt-4 text-sm font-semibold flex items-center gap-2">
                    <span>Thông tin thời khóa biểu của bạn: </span>
                    <span className="px-4 py-1 bg-gray-200 rounded text-xs">{numberOfCourse} môn</span>
                    <span className="px-4 py-1 bg-gray-200 rounded text-xs">{numberOfCredit} tín chỉ</span>
                </div>


                <table className="w-full text-sm border-separate border-spacing-2 table-fixed">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="sticky left-0 z-10 bg-white px-4 py-3 text-left font-medium text-slate-500 whitespace-nowrap">
                                Tiết học
                            </th>
                            <th className="sticky left-0 z-10 bg-white px-4 py-3 text-left font-medium text-slate-500 whitespace-nowrap">
                                Giờ học
                            </th>
                            {DAYS.map((day) => (
                                <th
                                    key={day}
                                    className="px-4 py-3 text-center font-medium text-slate-500 whitespace-nowrap"
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td
                                colSpan={DAYS.length + 1 + 1}
                                className="px-4 pt-4 pb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400"
                            >
                                Buổi sáng
                            </td>
                        </tr>
                        {MORNING.map((period, i) => (
                            <tr key={period}>
                                <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-slate-700">
                                    Tiết {period}
                                </td>
                                <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-slate-700">
                                    {TIME_MORNING[i]}
                                </td>
                                {DAYS.map((_, dayIdx) => (
                                    <TDCalendar key={dayIdx} {...calendar[dayIdx][i]} />
                                ))}
                            </tr>
                        ))}

                        {/* Thoi gian nghi trua */}
                        <tr>
                            <td
                                colSpan={DAYS.length + 1 + 1}
                                className="px-4 py-2 border-y border-dashed border-slate-200"
                            >
                                <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
                                    <SunnyIcon sx={{ fontSize: 14 }} />
                                    <span>Thời gian nghỉ trưa</span>
                                </div>
                            </td>
                        </tr>
                        {/* Thoi gian nghi trua */}

                        <tr>
                            <td
                                colSpan={DAYS.length + 1 + 1}
                                className="px-4 pt-4 pb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400"
                            >
                                Buổi chiều
                            </td>
                        </tr>
                        {AFTERNOON.map((period, i) => {
                            const rowIndex = MORNING.length + i;
                            return (
                                <tr key={period}>
                                    <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-slate-700">
                                        Tiết {period}
                                    </td>
                                    <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-slate-700">
                                        {TIME_AFTERNOON[i]}
                                    </td>
                                    {DAYS.map((_, dayIdx) => (
                                        <TDCalendar key={dayIdx} {...calendar[dayIdx][rowIndex]} />
                                    ))}
                                </tr>
                            );
                        })}

                        {/* Thoi gian nghi chieu - toi */}
                        <tr>
                            <td
                                colSpan={DAYS.length + 1 + 1}
                                className="px-4 py-2 border-y border-dashed border-slate-200"
                            >
                                <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
                                    <NightsStayIcon sx={{ fontSize: 14 }} />
                                    <span>Thời gian nghỉ chiều - tối</span>
                                </div>
                            </td>
                        </tr>
                        {/* Thoi gian nghi chieu - toi */}

                        <tr>
                            <td
                                colSpan={DAYS.length + 1 + 1}
                                className="px-4 pt-4 pb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400"
                            >
                                Buổi tối
                            </td>
                        </tr>
                        {EVENING.map((period, i) => {
                            const rowIndex = MORNING.length + AFTERNOON.length + i;
                            return (
                                <tr key={period}>
                                    <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-slate-700">
                                        Tiết {period}
                                    </td>
                                    <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-slate-700">
                                        {TIME_EVENING[i]}
                                    </td>
                                    {DAYS.map((_, dayIdx) => (
                                        <TDCalendar key={dayIdx} {...calendar[dayIdx][rowIndex]} />
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TimeTable;