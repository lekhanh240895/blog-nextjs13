import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./redux/Provider";
import AuthContext from "./context/AuthContext";
import LoginModal from "./modal/LoginModal";
import ScrollTopButton from "./components/ScrollTopButton";
import ToastContainer from "./components/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import EditProfileModal from "./modal/EditProfileModal";

const robotoSlab = Roboto_Slab({
  weight: ["500", "600", "400", "700", "800", "900"],
  subsets: ["vietnamese"],
});

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

      <body className={robotoSlab.className}>
        <ReduxProvider>
          <AuthContext>
            <LoginModal />
            <EditProfileModal />

            {children}

            <ScrollTopButton />
          </AuthContext>
        </ReduxProvider>

        <ToastContainer limit={2} position="top-center" />
      </body>
    </html>
  );
}
