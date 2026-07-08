import type { Metadata } from "next";
import AppShell from "./component/AppShell";
import "./style/index.css";
import { ModalProvider } from "./context/Modal";
import { ToastProvider } from "./context/Toast";

export const metadata: Metadata = {
  title: "SGU SORT",
  description: "Sắp xếp thời khóa biểu cho sinh viên SGU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50">
        <ToastProvider>
          <ModalProvider>
            <AppShell>
              {children}
            </AppShell>
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
