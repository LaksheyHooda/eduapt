import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "About EDUAPT",
  description: "About EDUAPT - a website designed to bring the power of AI and adaptive learning to the masses",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <Link href={'/dashboard'} className="fixed text-2xl font-black left-20 top-2">EDUAPT</Link>
      {children}
    </main>
  );
}
