import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "About EDUAPT",
  description: "About EDUAPT - a website designed to bring the power of AI and adaptive learning to the masses",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <h1 className="f">EDUAPT</h1>
      {children}
    </main>
  );
}
