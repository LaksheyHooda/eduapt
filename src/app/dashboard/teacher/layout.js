import { Inter } from "next/font/google";
import HamNavBar from "@/components/dashboard-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Teacher Dashboard",
  description: "Dashboard for teachers within EDUAPT",
};

export default function RootLayout({ children }) {
  return (
    <section>
      <HamNavBar className="z-10 fixed top-0 left-0" />
      <div className="inline-block max-w-lg text-center justify-center overscroll-x-none">
        {children}
      </div>
    </section>
  );
}