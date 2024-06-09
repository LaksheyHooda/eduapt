import { Inter } from "next/font/google";
import NavBar from "@/components/landingpage-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login",
  description: "Login page for Eduapt",
};

export default function RootLayout({ children }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar />
      {children}
    </section>
  );
}
