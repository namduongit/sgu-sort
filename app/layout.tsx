import type { Metadata } from "next";
import AppShell from "./component/AppShell";
import "./style/index.css";
import { ModalProvider } from "./context/Modal";
import { ToastProvider } from "./context/Toast";

const siteUrl = "https://sgu-sort.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SGU Sort - Công cụ sắp xếp thời khóa biểu SGU",
    template: "%s | SGU Sort",
  },
  description:
    "SGU Sort giúp sinh viên Đại học Sài Gòn (SGU) sắp xếp, xếp lịch thời khóa biểu nhanh chóng, tránh trùng lịch học, tối ưu tổ hợp môn học chỉ trong vài giây.",
  keywords: [
    "SGU Sort",
    "thời khóa biểu SGU",
    "xếp thời khóa biểu Đại học Sài Gòn",
    "tkb SGU",
    "công cụ xếp lịch SGU",
    "đăng ký môn học SGU",
  ],
  authors: [{ name: "SGU Sort" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "SGU Sort",
    title: "SGU Sort - Công cụ sắp xếp thời khóa biểu SGU",
    description:
      "Sắp xếp thời khóa biểu cho sinh viên SGU nhanh, tránh trùng lịch, dễ dùng.",
    images: [
      {
        url: "./image/logo.png",
        width: 1200,
        height: 630,
        alt: "SGU Sort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SGU Sort - Công cụ sắp xếp thời khóa biểu SGU",
    description: "Sắp xếp thời khóa biểu cho sinh viên SGU nhanh, tránh trùng lịch.",
    images: ["./image/logo.png"],
  },
  // verification: {
  //   google: "mã-verify-từ-Google-Search-Console",
  // },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "SGU Sort",
              url: "https://sgu-sort.vercel.app",
              description: "Công cụ sắp xếp thời khóa biểu cho sinh viên SGU",
              applicationCategory: "EducationApplication",
              operatingSystem: "Web",
              inLanguage: "vi",
            }),
          }}
        />
        <ToastProvider>
          <ModalProvider>
            <AppShell>{children}</AppShell>
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}