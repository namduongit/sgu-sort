import "./List.css";

const ListPage = () => {
	const highlights = [
		{
			icon: "fa-list-check",
			title: "Theo dõi danh sách môn",
			desc: "Xem nhanh số lượng đăng ký và thông tin nhóm tổ của từng môn học.",
		},
		{
			icon: "fa-clock-rotate-left",
			title: "Cập nhật liên tục",
			desc: "Dữ liệu được cập nhật mới, giúp bạn ra quyết định chính xác hơn.",
		},
		{
			icon: "fa-wand-magic-sparkles",
			title: "Kết hợp Sort",
			desc: "Chọn môn ngay từ danh sách và chuyển qua trang sắp xếp chỉ với một cú nhấp.",
		},
	];

	const steps = [
		"Chọn môn bạn quan tâm để xem chi tiết nhóm tổ",
		"Kiểm tra sĩ số và lịch học của từng nhóm",
		"Gửi môn sang trang Sắp xếp để tránh trùng lịch",
		"Tải thời khóa biểu và chia sẻ với bạn bè",
	];

	return (
		<div className="list-page py-5">
			<div className="container">
				<div className="list-hero shadow-sm rounded-4 p-4 p-lg-5 mb-5 position-relative overflow-hidden">
					<div className="list-bubble bubble-1" aria-hidden="true" />
					<div className="list-bubble bubble-2" aria-hidden="true" />
					<div className="row align-items-center g-4">
						<div className="col-lg-7">
							<p className="badge bg-light text-primary fw-semibold px-3 py-2 mb-3">Danh sách môn học</p>
							<h1 className="fw-bold mb-3 text-dark">Xem nhanh, chọn gọn</h1>
							<p className="lead text-secondary mb-4">
								Tổng hợp môn học, nhóm tổ, sĩ số và lịch học trong một giao diện trực quan. Dễ dàng lọc, xem, rồi chuyển sang sắp xếp thời khóa biểu.
							</p>
							<div className="d-flex flex-wrap gap-2">
								<a className="btn btn-primary px-4" href="/feature/sort">Mở trang sắp xếp</a>
								<a className="btn btn-outline-primary px-4" href="/page/contact">Yêu cầu hỗ trợ</a>
							</div>
						</div>
						<div className="col-lg-5 text-center">
							<div className="list-illustration mx-auto">
								<div className="list-chip">ds_mon_hoc.json</div>
								<div className="list-card shadow">
									<div className="d-flex justify-content-between mb-2">
										<span className="text-muted small">Môn học</span>
										<span className="badge bg-success-subtle text-success">Real-time</span>
									</div>
									<div className="list-row">
										<span>CTDL &amp; GT</span>
										<span className="text-secondary">45/60</span>
									</div>
									<div className="list-row">
										<span>Thiết kế Web</span>
										<span className="text-secondary">30/35</span>
									</div>
									<div className="list-row">
										<span>Hệ điều hành</span>
										<span className="text-secondary">52/55</span>
									</div>
									<p className="mt-3 mb-0 text-muted small">Chạm để xem nhóm tổ &amp; lịch học</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row g-4 mb-5">
					{highlights.map((item, idx) => (
						<div key={idx} className="col-md-4">
							<div className="list-card feature h-100 shadow-sm">
								<div className="icon-wrap mb-3">
									<i className={`fa-solid ${item.icon}`} />
								</div>
								<h5 className="fw-semibold mb-2">{item.title}</h5>
								<p className="text-secondary mb-0">{item.desc}</p>
							</div>
						</div>
					))}
				</div>

				<div className="list-steps shadow-sm rounded-4 p-4 p-lg-5">
					<div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
						<div>
							<p className="badge bg-light text-primary fw-semibold px-3 py-2 mb-2">Hướng dẫn nhanh</p>
							<h3 className="fw-bold mb-1">4 bước duyệt môn &amp; sắp xếp</h3>
							<p className="text-secondary mb-0">Theo dõi – Chọn – Kiểm tra trùng lịch – Hoàn tất.</p>
						</div>
						<a className="btn btn-primary mt-3 mt-md-0" href="/feature/sort">Bắt đầu ngay</a>
					</div>
					<div className="row g-3">
						{steps.map((step, idx) => (
							<div key={idx} className="col-md-3 col-sm-6">
								<div className="step-item h-100">
									<div className="step-number">{idx + 1}</div>
									<p className="mb-0 text-secondary">{step}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListPage;