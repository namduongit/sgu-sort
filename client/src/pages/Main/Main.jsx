import "./Main.css";

const MainPage = () => {
    return (
        <div className="main-page">
            <div className="main-page-wrap">
                <div className="main-page-detail d-flex align-items-center text-center">
                    <div className="overlay"></div>
                    <div className="container position-relative">
                        <p className="badge bg-light text-primary fw-semibold px-3 py-2 mb-3">Sắp xếp TKB SGU</p>
                        <h1 className="fw-bold display-3 text-dark">SGU Sort</h1>
                        <p className="lead mb-3 text-dark">
                            Nắm bắt số lượng đăng ký của từng môn học <br />
                            và sắp xếp thời khóa biểu thông minh, nhanh chóng.
                        </p>
                        <p className="mb-4 text-secondary">
                            Tránh trùng lịch, tối ưu thời gian học, theo dõi realtime. Tất cả chỉ với vài cú click đơn giản.
                        </p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <a href="/feature/sort" className="btn btn-primary btn-lg px-4 shadow-soft">
                                Xem ngay
                            </a>
                            <a href="/page/contact" className="btn btn-outline-primary btn-lg px-4 shadow-soft">
                                Liên hệ
                            </a>
                            <a href="/page/donate" className="btn btn-light btn-lg px-4 shadow-soft">
                                Ủng hộ dự án
                            </a>
                        </div>

                        <div className="main-stats mt-4 d-flex flex-wrap justify-content-center gap-3">
                            {[{
                                icon: "fa-gauge-high",
                                label: "Theo dõi realtime",
                                value: "Sĩ số từng môn"
                            }, {
                                icon: "fa-shuffle",
                                label: "Tránh trùng lịch",
                                value: "Phát hiện xung đột"
                            }, {
                                icon: "fa-bolt",
                                label: "Nhanh & tiện",
                                value: "2-3 phút hoàn tất"
                            }].map((item, idx) => (
                                <div key={idx} className="stat-chip d-flex align-items-center gap-2 px-3 py-2">
                                    <i className={`fa-solid ${item.icon} text-primary`} />
                                    <div className="text-start">
                                        <div className="fw-semibold small text-dark">{item.label}</div>
                                        <div className="text-secondary small">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="main-page-features py-5">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-2">Tính năng nổi bật</h2>
                        <p className="text-center text-secondary mb-5">Tập trung vào trải nghiệm đơn giản, nhanh và chính xác.</p>
                        <div className="row g-4">
                            {[{
                                icon: "fa-glasses",
                                title: "Theo dõi đăng ký",
                                desc: "Xem nhanh số lượng sinh viên đã đăng ký / tối đa của từng môn học."
                            }, {
                                icon: "fa-arrow-down-short-wide",
                                title: "Sắp xếp TKB",
                                desc: "Gợi ý lịch học hợp lý, hạn chế trùng tiết và tối ưu thời gian."
                            }, {
                                icon: "fa-circle-check",
                                title: "Kiểm tra xung đột",
                                desc: "Cảnh báo khi có nhóm tổ trùng lịch, giúp bạn chọn phương án tốt nhất."
                            }, {
                                icon: "fa-bolt",
                                title: "Nhanh & tiện lợi",
                                desc: "Giao diện rõ ràng, thao tác nhanh chóng cho sinh viên."
                            }].map((feature, idx) => (
                                <div key={idx} className="col-md-6 col-lg-3">
                                    <div className="card h-100 shadow feature-card text-center p-4">
                                        <div className="fs-1 mb-3 text-primary">
                                            <i className={`fa-solid ${feature.icon}`}></i>
                                        </div>
                                        <h5 className="fw-semibold">{feature.title}</h5>
                                        <p className="text-secondary mb-0">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div id="send" className="main-page-send py-5">
                    <div className="container">
                        <div className="row justify-content-between align-items-center g-4">
                            <div className="col-lg-5">
                                <p className="badge bg-light text-primary fw-semibold px-3 py-2 mb-3">Liên hệ với chúng tôi</p>
                                <h2 className="fw-bold mb-3 text-dark">Cần hỗ trợ? Hãy nhắn cho SGU Sort</h2>
                                <p className="text-secondary mb-0">Chúng tôi luôn sẵn sàng hỗ trợ về tính năng, dữ liệu môn học hoặc đóng góp ý tưởng để dự án tốt hơn.</p>
                            </div>
                            <div className="col-lg-6">
                                <form className="p-4 rounded-4 shadow bg-white">
                                    <div className="mb-3">
                                        <label className="form-label">Họ và tên</label>
                                        <input type="text" className="form-control" placeholder="Nhập họ tên..." />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" placeholder="example@sgu.edu.vn" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nội dung</label>
                                        <textarea className="form-control" rows="4" placeholder="Nhập tin nhắn..."></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Gửi mail
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MainPage;
