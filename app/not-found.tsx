import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Trang bạn tìm không tồn tại
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Đường dẫn này chưa được tạo hoặc đã bị thay đổi. Hãy quay về trang sắp xếp thời khóa biểu để tiếp tục.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/page/time-table"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Đi đến trang thời khóa biểu
          </Link>
        </div>
      </div>
    </div>
  );
}
