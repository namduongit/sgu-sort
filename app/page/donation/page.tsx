export default function DonationPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Đóng góp
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Chia sẻ và đóng góp cho dự án SGU SORT
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Dự án được phát triển với mục tiêu giúp sinh viên sắp xếp thời khóa biểu dễ dàng hơn.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Chủ dự án</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li><span className="font-medium text-slate-900">Tên:</span> Nguyễn Nam Dương</li>
            <li><span className="font-medium text-slate-900">Github:</span> namduongit</li>
            <li><span className="font-medium text-slate-900">Email:</span> nguyennamduong205@gmail.com</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Đóng góp ý kiến</h2>
          <form className="mt-4 space-y-3">
            <input
              placeholder="Tên của bạn"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
            />
            <textarea
              placeholder="Ý kiến đóng góp"
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
            />
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
              Gửi góp ý
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
