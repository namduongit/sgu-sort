import { useState } from "react";
import "./Donate.css";

const DonatePage = () => {
  const [frequency, setFrequency] = useState("once");
  const [amount, setAmount] = useState("5000");
  const [customAmount, setCustomAmount] = useState("");
  const [showQR, setShowQR] = useState(false);

  const QR_URL = "https://img.vietqr.io/image/ICB-0388853835-qr_only.png";

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowQR(true);
  };

  const handleClose = () => {
    setShowQR(false);
  };

  return (
    <div className="donate-page py-5">
      <div className="container">
        <div className="row g-4 align-items-center">
          {/* LEFT CONTENT */}
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="fw-bold display-5 mb-3">Ủng hộ chúng tôi</h1>
            <p className="lead text-secondary mb-3">
              Chúng tôi rất cần sự hỗ trợ từ bạn để duy trì và phát triển dự án.
              Mỗi đóng góp, dù nhỏ, đều góp phần mang lại sự thay đổi tích cực.
            </p>
            <p className="text-muted">
              Bạn có thể lựa chọn đóng góp <b>một lần</b> hoặc <b>hàng tháng</b>.  
              Xin chân thành cảm ơn bạn đã đồng hành cùng chúng tôi! ❤️
            </p>
          </div>

          {/* FORM */}
          <div className="col-lg-6">
            <form
              onSubmit={handleSubmit}
              className="p-4 rounded-4 shadow bg-white"
            >
              <div className="mb-3">
                <label className="form-label fw-bold">Tần suất đóng góp</label>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className={`btn flex-fill ${
                      frequency === "once"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setFrequency("once")}
                  >
                    Một lần
                  </button>
                  <button
                    type="button"
                    className={`btn flex-fill ${
                      frequency === "monthly"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setFrequency("monthly")}
                  >
                    Hàng tháng
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Số tiền</label>
                <div className="d-flex flex-wrap gap-2">
                  {["5000", "10000", "20000", "50000"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`btn ${
                        amount === val ? "btn-success" : "btn-outline-success"
                      }`}
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount("");
                      }}
                    >
                      {parseInt(val).toLocaleString("vi-VN")} đ
                    </button>
                  ))}
                  <input
                    type="number"
                    className="form-control w-auto"
                    placeholder="Khác..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(e.target.value);
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showQR && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3 rounded-4 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">Quét mã QR để thanh toán</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p className="fw-bold mb-3">
                  Số tiền:{" "}
                  <span className="text-success">
                    {parseInt(amount).toLocaleString("vi-VN")} đ
                  </span>
                </p>
                <img
                  src={QR_URL}
                  alt="QR thanh toán"
                  className="img-fluid shadow rounded-3"
                  style={{ maxWidth: "250px" }}
                />
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonatePage;
