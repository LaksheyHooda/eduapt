import { Link } from "@nextui-org/react";

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-lg">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <Link className="text-greentxtclr font-bold text-3xl" href="/">
          INTELLEDAPT
        </Link>

        <div className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link
                className="text-green-600 hover:text-gray-700 text-lg"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="text-green-600 hover:text-gray-700 text-lg"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="text-green-600 hover:text-gray-700 text-lg"
                href="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:hidden">
          <button className="text-green-600 focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
