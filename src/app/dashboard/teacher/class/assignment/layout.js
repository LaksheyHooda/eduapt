import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Class Asssignment",
  description: "Assignment page for teachers within EDUAPT",
};

export default function RootLayout({ children }) {
  return (
    <section>
      <div className="inline-block max-w-lg text-center justify-center overscroll-x-none">
        {children}
      </div>
    </section>
  );
}