import { Inter } from "next/font/google";
import HamNavBar from "@/components/dashboard-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notifications",
  description: "Notifications page for Eduapt",
};

export default function RootLayout({ children }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <HamNavBar className="z-30 fixed top-0 left-0" />
      <div className="inline-block max-w-lg text-center justify-center overscroll-x-none">
        {children}
      </div>
    </section>
  );
}
