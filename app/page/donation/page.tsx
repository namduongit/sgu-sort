'use client'

export default function DonationPage() {
  const contributionWays = [
    {
      title: "Ủng hộ tài chính",
      desc: "Giúp duy trì server, tên miền và chi phí vận hành dự án lâu dài.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Đóng góp mã nguồn",
      desc: "Cùng phát triển tính năng mới, sửa lỗi hoặc cải thiện hiệu năng trên GitHub.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <path d="M8 3 4 7l4 4M16 3l4 4-4 4M14 3l-4 18" />
        </svg>
      ),
    },
    {
      title: "Góp ý & báo lỗi",
      desc: "Mỗi phản hồi đều giúp SGU Sort hoàn thiện hơn cho các bạn sinh viên khác.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-4-1L3 20l1.1-3.5A8.38 8.38 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
        </svg>
      ),
    },
    {
      title: "Lan tỏa dự án",
      desc: "Chia sẻ SGU Sort tới bạn bè, khóa dưới để nhiều người biết đến hơn.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <path d="M8.6 10.5 15.4 6.5M8.6 13.5l6.8 4" />
        </svg>
      ),
    },
  ];

  const techStack = ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"];

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Đóng góp
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Chia sẻ và đóng góp cho dự án SGU Sort
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          SGU Sort là dự án phi lợi nhuận, được phát triển với mục tiêu giúp sinh viên sắp xếp
          thời khóa biểu dễ dàng, nhanh chóng và trực quan hơn. Mọi sự đóng góp — dù là code,
          ý kiến hay chỉ một lời chia sẻ — đều là động lực để dự án phát triển tiếp.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900">Các cách bạn có thể đóng góp</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {contributionWays.map((item) => (
            <div
              key={item.title}
              className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                {item.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Chủ dự án</h2>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white">
              ND
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Nguyễn Nam Dương</p>
              <p className="text-xs text-slate-500">Người sáng lập & phát triển SGU Sort</p>
            </div>
          </div>

          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-slate-500">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
              </svg>
              <span><span className="font-medium text-slate-900">GitHub:</span> namduongit</span>
            </li>
            <li className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-slate-500">
                <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
              </svg>
              <span><span className="font-medium text-slate-900">Email:</span> nguyennamduong205@gmail.com</span>
            </li>
          </ul>

          <p className="mt-5 text-xs leading-5 text-slate-400">
            Mọi ý tưởng, báo lỗi hoặc pull request đều được chào đón trên GitHub của dự án.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Đóng góp ý kiến</h2>
          <p className="mt-1 text-sm text-slate-500">
            Bạn thấy tính năng nào chưa ổn hoặc muốn đề xuất thêm? Cho mình biết nhé.
          </p>

          <form className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Tên của bạn"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
              />
              <input
                type="email"
                placeholder="Email (không bắt buộc)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
              />
            </div>

            <select
              defaultValue=""
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
            >
              <option value="" disabled>Loại góp ý</option>
              <option value="bug">Báo lỗi</option>
              <option value="feature">Đề xuất tính năng</option>
              <option value="other">Khác</option>
            </select>

            <textarea
              placeholder="Ý kiến đóng góp"
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Gửi góp ý
            </button>
          </form>
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center sm:p-8">
        <p className="text-sm leading-6 text-slate-500">
          Cảm ơn bạn đã dành thời gian ghé qua và quan tâm đến SGU Sort. Sự ủng hộ của bạn,
          dù nhỏ, cũng là động lực để dự án tiếp tục phát triển. 💙
        </p>
      </div>
    </section>
  );
}