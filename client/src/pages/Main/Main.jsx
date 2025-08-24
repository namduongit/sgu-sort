import "./Main.css";

const MainPage = () => {
    return (
        <div className="main-page">
            <div className="main-page-wrap">

                <div className="main-page-detail d-flex align-items-center text-center">
                    <div className="overlay"></div>
                    <div className="container position-relative">
                        <h1 className="fw-bold display-3">SGU Sort</h1>
                        <p className="lead mb-3 text-dark">
                            Nắm bắt số lượng đăng ký của từng môn học <br />
                            và sắp xếp thời khóa biểu thông minh, nhanh chóng.
                        </p>
                        <p className="mb-4 text-secondary">
                            Tránh trùng lịch, tối ưu thời gian học, theo dõi realtime.
                            Tất cả chỉ với vài cú click đơn giản.
                        </p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <a href="/page/sort" className="btn btn-primary btn-lg px-4 shadow-soft">
                                Xem ngay
                            </a>
                            <a href="/page/contact" className="btn btn-outline-primary btn-lg px-4 shadow-soft">
                                Liên hệ
                            </a>
                        </div>
                    </div>
                </div>

                <div className="main-page-features py-5">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-5">Tính năng nổi bật</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="card h-100 shadow feature-card text-center p-4">
                                    <div className="fs-1 mb-3">
                                        <i class="fa-solid fa-glasses"></i>
                                    </div>
                                    <h5>Theo dõi đăng ký</h5>
                                    <p className="text-secondary">
                                        Xem nhanh số lượng sinh viên đã đăng ký / tối đa của từng môn học.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 shadow feature-card text-center p-4">
                                    <div className="fs-1 mb-3">
                                        <i class="fa-solid fa-arrow-down-short-wide"></i>
                                    </div>
                                    <h5>Sắp xếp TKB</h5>
                                    <p className="text-secondary">
                                        Gợi ý lịch học hợp lý, hạn chế trùng tiết và tối ưu thời gian.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 shadow feature-card text-center p-4">
                                    <div className="fs-1 mb-3">
                                        <i class="fa-solid fa-bolt"></i>
                                    </div>
                                    <h5>Nhanh & tiện lợi</h5>
                                    <p className="text-secondary">
                                        Giao diện rõ ràng, thao tác nhanh chóng cho sinh viên.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="send" className="main-page-send py-5">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-4">Liên hệ với chúng tôi</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
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
