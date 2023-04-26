import "../globals.css";
import { Vollkorn } from "next/font/google";
import AuthContext from "./AuthContext";

const vollkorn = Vollkorn({
  weight: ["500", "600", "400", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin - KhanhReview",
  description: "Quản lý trang",
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
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
