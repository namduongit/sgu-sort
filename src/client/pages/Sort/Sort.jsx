import "./Sort.css";

import { useEffect, useState } from "react";
import useSubjects from "../../hook/useSubjects";
import MiniSearch from "minisearch";

import Subject from "../../components/common/Subject/Subject";
import SubjectGroup from "../../components/common/SubjectGroup/SubjectGroup";
import Calendar from "../../components/common/Calendar/Calender";

import { checkConflict, parseSchedule } from "../../utils/parseSchedule";

const calendar = Array.from({ length: 10 }, () => Array(8).fill(null));

const SortPage = () => {
    const { data, loading } = useSubjects();
    const ds_mon_hoc = data.ds_mon_hoc || [];
    const ds_nhom_to = data.ds_nhom_to || [];

    const [filterSubject, setFilterSubject] = useState([]);
    const [choosenSubjects, setChosenSubjects] = useState([]);
    const [showGroupSubject, setShowGroupSubject] = useState([]);
    const [calendar, setCalendar] = useState([]);

    const [showFilterSubject, setShowFilterSubject] = useState(true);
    const [showResultSubject, setShowResultSubject] = useState(true);

    const [inputSearch, setInputSearch] = useState("");

    const [expandedSubject, setExpandedSubject] = useState(null);
    const [dsMHSearch, setDsMHSearch] = useState(null);
    const [dsNTSearch, setDsNTSearch] = useState(null);


    const handleSelectSubject = (subject) => {
        if (choosenSubjects.some(s => s.ma === subject.ma || s.ten === subject.ten)) {
            alert("Môn đã có")
            return;
        }
        setChosenSubjects(prev => [...prev, subject]);
        let groups = dsNTSearch.search(subject.ma);
        setShowGroupSubject(prev => [...prev, {
            ma_mon: subject.ma,
            ten_mon: subject.ten,
            nhom_to: groups
        }]);
    };

    const isScheduleConflict = (newCal) => {
        const tkbOrders = calendar.map(cal => cal.tkb);
        const isConflict = checkConflict(newCal.tkb, tkbOrders);
        if (isConflict) {
            alert("Lịch học bị trùng!");
            return;
        }
        setCalendar(prev => [...prev, newCal]);
    }

    const handleCalendarSubject = (newCal) => {
        isScheduleConflict(newCal);
    }

    useEffect(() => {
        if (!ds_mon_hoc || ds_mon_hoc.length === 0) return;
        const miniDsMH = new MiniSearch({
            fields: ['ma', 'ten'],
            storeFields: ['ma', 'ten']
        });
        miniDsMH.addAll(ds_mon_hoc);
        setDsMHSearch(miniDsMH);
    }, [ds_mon_hoc]);

    useEffect(() => {
        if (!ds_nhom_to || ds_nhom_to.length === 0) return;
        const miniDsNT = new MiniSearch({
            fields: ['ma_mon'],
            storeFields: ['ma_mon', 'tenMH', 'nhom_to', 'tkb']
        });
        miniDsNT.addAll(ds_nhom_to);
        setDsNTSearch(miniDsNT);
    }, [ds_nhom_to]);

    return (
        <div className="sort-page container-fluid py-4 px-5">
            <div className="row g-4 sort-page-content">
                <div className="col-md-3 search-box">
                    <div className="sort-box shadow p-3 rounded-3">
                        <h5 className="mb-3 d-flex justify-content-between align-items-center fw-bold">
                            <span>Tìm kiếm môn học</span>
                            <i
                                className={`fa-solid ${showFilterSubject ? "fa-chevron-up" : "fa-chevron-down"} cursor-pointer`}
                                onClick={() => setShowFilterSubject(!showFilterSubject)}
                            />
                        </h5>

                        {showFilterSubject && (
                            <>
                                <div className={`position-relative mb-3`}>
                                    <input
                                        type="text"
                                        className="form-control pe-5"
                                        placeholder="Nhập tên môn..."
                                        value={inputSearch}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setInputSearch(value);

                                            if (value.trim() === "") {
                                                setFilterSubject([]);
                                                return;
                                            }

                                            if (dsMHSearch) {
                                                const results = dsMHSearch.search(value);
                                                setFilterSubject(results);
                                            }
                                        }}
                                    />
                                    {inputSearch && (
                                        <i
                                            className="fa-solid fa-x position-absolute top-50 end-0 translate-middle-y me-3 text-muted cursor-pointer"
                                            onClick={() => setInputSearch("")}
                                        />
                                    )}
                                </div>

                                <div className="subject-list scroll-area">
                                    {filterSubject.length > 0 ? (
                                        filterSubject.map((subject, index) => (
                                            <div key={index} className="mb-1" onClick={() => handleSelectSubject(subject)}>
                                                <Subject subject={subject} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-muted fst-italic">Không tìm thấy môn học nào.</div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="result-box shadow p-3 rounded-3">
                        <h5 className="mb-3 d-flex justify-content-between align-items-center fw-bold">
                            <span>Môn học đã chọn</span>
                            <i
                                className={`fa-solid ${showResultSubject ? "fa-chevron-up" : "fa-chevron-down"} cursor-pointer`}
                                onClick={() => setShowResultSubject(!showResultSubject)}
                            />
                        </h5>
                        {showResultSubject && (
                            <>
                                <div className="subject-box position-relative">
                                    {showGroupSubject.length > 0 ? (
                                        showGroupSubject.map((group, index) => {
                                            const isExpanded = group.ma_mon === expandedSubject;
                                            return (
                                                <>
                                                    <div key={index} className="mb-3 rounded py-2 subject-item position-relative d-flex justify-content-between align-items-center">

                                                        <div
                                                            className="d-flex justify-content-between align-items-center cursor-pointer"
                                                            onClick={() => setExpandedSubject(isExpanded ? null : group.ma_mon)}
                                                        >
                                                            <h6 className="mb-0 px-2">{group.ten_mon}</h6>
                                                            <i
                                                                className={`fa-solid ${isExpanded ? "fa-plus" : "fa-minus"}`} />
                                                        </div>

                                                        <div className="subject-group-clear">
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {isExpanded && (
                                                            <div className="mt-2">
                                                                {group.nhom_to && group.nhom_to.length > 0 ? (
                                                                    group.nhom_to.map((nt, i) => (
                                                                        <div key={i} onClick={() => handleCalendarSubject(nt)}>
                                                                            <SubjectGroup group={nt} />
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="text-muted fst-italic ps-2">Không có nhóm tổ nào.</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            );
                                        })
                                    ) : (
                                        <div className="text-muted fst-italic">Không tìm thấy môn học đã chọn nào.</div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="col-md-9 sort-page-scheduler">
                    <div className="calendar-box shadow p-3 rounded-3 h-100">
                        <h5 className="mb-3">🗓 Thời khóa biểu</h5>
                        {choosenSubjects.length === 0 ? (
                            <div className="text-muted fst-italic">Chưa có môn học nào được chọn.</div>
                        ) : (
                            <Calendar calendar={calendar} />
                        )}
                        <div className="button-box mt-3">
                            <button type="button" className="btn btn-primary">Tải thời khóa biểu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortPage;
