import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Join Class",
  description: "Join class page for students within EDUAPT",
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
