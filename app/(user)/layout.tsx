import Header from "../components/Header";
import "../globals.css";
import { Vollkorn } from "next/font/google";

const vollkorn = Vollkorn({
  weight: ["500", "600", "400", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Blog - Lê Khánh - Reviews - News",
  description:
    "Trang cập nhật sản phẩm hot và đáng mua trong các lĩnh vực công nghệ, thời trang, thể thao và kinh doanh v.v. Theo dõi để không bỏ lỡ thông tin!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      <body className={vollkorn.className}>
        <Header />

        {children}
      </body>
    </html>
  );
}
