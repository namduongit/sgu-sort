import { useEffect, useState } from "react";
import Subject from "../../components/common/Subject/Subject";
import "./SortPage.css";
import Notification from "../../components/common/Notification/Notification";

const subjectList = [
    {
        id: 1,
        name: "Nguyễn Nam Dương",
        time: "Tiết 1-3 (T2)",
        place: "Phòng A101",
        group: "A"
    },
    {
        id: 2,
        name: "Toán rời rạc",
        time: "Tiết 4-6 (T3)",
        place: "Phòng B203",
        group: "B"
    },
    {
        id: 3,
        name: "Nhập môn AI",
        time: "Tiết 1-3 (T4)",
        place: "Phòng A102",
        group: "C"
    },
    {
        id: 4,
        name: "Cấu trúc dữ liệu",
        time: "Tiết 7-9 (T5)",
        place: "Phòng C301",
        group: "D"
    }
];

const SortPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [filterSubject, setFilterSubject] = useState([]);
    const [choosenSubjects, setChosenSubjects] = useState([]);

    const [showFilterSubject, setShowFilterSubject] = useState(true);
    const [showResultSubject, setShowResultSubject] = useState(true);

    const [inputSearch, setInputSearch] = useState("");

    // refreshToken();

    useEffect(() => {
        setSubjects(subjectList);
        setFilterSubject(subjectList);
    }, []);

    useEffect(() => {
        const keyword = inputSearch.toLowerCase();
        const filtered = subjects.filter(subject =>
            subject.name.toLowerCase().includes(keyword)
        );
        setFilterSubject(filtered);
    }, [inputSearch, subjects]);

    return (
        <div className="sort-page container py-4">
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="sort-box shadow p-3 rounded-3 mb-2">
                        <h5 className="mb-3 d-flex justify-content-between align-items-center">
                            <span>Tìm kiếm môn học</span>
                            <i
                                className={`fa-solid ${showFilterSubject ? "fa-chevron-up" : "fa-chevron-down"} cursor-pointer`}
                                onClick={() => setShowFilterSubject(!showFilterSubject)}
                            />
                        </h5>

                        {showFilterSubject && (
                            <>
                                <div className="position-relative mb-3">
                                    <input
                                        type="text"
                                        className="form-control pe-5"
                                        placeholder="Nhập tên môn..."
                                        value={inputSearch}
                                        onChange={(e) => setInputSearch(e.target.value)}
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
                                            <div className="subject-box" onClick={() => {
                                                const isExist = choosenSubjects.some(s => s.id == subject.id);
                                                if (isExist) {
                                                    <Notification messenger="Môn này đã có" type={2} />
                                                } else {
                                                    setChosenSubjects([...choosenSubjects, subject]);
                                                }
                                            }}>
                                                <Subject key={index} subject={subject} />
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
                        <h5 className="mb-3 d-flex justify-content-between align-items-center">
                            <span>Môn học đã chọn</span>
                            <i
                                className={`fa-solid ${showResultSubject ? "fa-chevron-up" : "fa-chevron-down"} cursor-pointer`}
                                onClick={() => setShowResultSubject(!showResultSubject)}
                            />
                        </h5>

                        {choosenSubjects.length > 0 ? (
                            choosenSubjects.map((subject, index) => (
                                <div className="subject-box position-relative" key={index}>
                                    <Subject subject={subject} />
                                    <i
                                        className="fa-solid fa-xmark position-absolute top-0 end-0 m-2 text-danger cursor-pointer"
                                        title="Xoá môn"
                                        onClick={() =>
                                            setChosenSubjects(choosenSubjects.filter(s => s.id !== subject.id))
                                        }
                                    ></i>
                                </div>
                            ))
                        ) : (
                            <div className="text-muted fst-italic">Không tìm thấy môn học đã chọn nào.</div>
                        )}
                    </div>

                </div>

                <div className="col-md-8">
                    <div className="calendar-box shadow p-3 rounded-3 h-100">
                        <h5 className="mb-3">🗓 Thời khóa biểu</h5>
                        {choosenSubjects.length == 0 ? (
                            <div className="text-muted fst-italic">Chưa có môn học nào được chọn.</div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <td>Tiết học</td>
                                        <td>Thứ 2</td>
                                        <td>Thứ 3</td>
                                        <td>Thứ 4</td>
                                        <td>Thứ 5</td>
                                        <td>Thứ 6</td>
                                        <td>Thứ 7</td>
                                        <td>Chủ nhật</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>Tiết 1</td>
                                    <td>......</td>
                                    <td>......</td>
                                    <td>......</td>
                                    <td>......</td>
                                    <td>......</td>
                                    <td>......</td>
                                    <td>......</td>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortPage;
