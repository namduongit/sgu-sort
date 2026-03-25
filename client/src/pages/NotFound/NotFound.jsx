import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-page d-flex align-items-center py-4">
            <div className="container">
                <div className="notfound-card shadow-lg position-relative overflow-hidden">
                    <div className="notfound-bubble bubble-1" aria-hidden="true" />
                    <div className="notfound-bubble bubble-2" aria-hidden="true" />

                    <div className="row align-items-center g-4">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="badge rounded-pill bg-light text-primary px-3 py-2 mb-3 fw-semibold">
                                <i className="fa-solid fa-compass me-2" />
                                Trang bạn tìm không tồn tại
                            </p>
                            <h1 className="display-4 fw-bold mb-2 text-dark">404</h1>
                            <h2 className="h4 fw-semibold text-primary mb-3">Không tìm thấy nội dung</h2>
                            <p className="text-secondary mb-4">
                                Có thể đường dẫn đã thay đổi hoặc bạn gõ nhầm. Hãy quay lại trang chính hoặc tiếp tục khám phá các tính năng chính của SGU Sort.
                            </p>

                            <div className="d-flex flex-wrap gap-2 gap-sm-3">
                                <button className="btn btn-primary px-4" onClick={() => navigate("/")}>
                                    Về trang chủ
                                </button>
                                <button className="btn btn-outline-primary px-4" onClick={() => navigate("/feature/sort")}>
                                    Đến trang sắp xếp
                                </button>
                                <button className="btn btn-light px-4" onClick={() => navigate("/page/contact")}>
                                    Liên hệ hỗ trợ
                                </button>
                            </div>

                            <div className="d-flex flex-column flex-sm-row gap-3 mt-4 text-muted small">
                                <div className="d-flex align-items-center">
                                    <i className="fa-regular fa-circle-check text-success me-2" />
                                    Đường dẫn đã được kiểm tra
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-headset text-primary me-2" />
                                    Luôn sẵn sàng hỗ trợ bạn
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 text-center">
                            <div className="notfound-illustration mx-auto">
                                <div className="notfound-orb" />
                                <div className="notfound-figure shadow-sm">
                                    <div className="face">
                                        <div className="eye" />
                                        <div className="eye" />
                                        <div className="mouth" />
                                    </div>
                                </div>
                                <p className="mt-3 text-secondary">
                                    "Oops!" Có vẻ như bạn đã rẽ nhầm hướng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;