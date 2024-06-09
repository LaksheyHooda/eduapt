import { Link } from "@nextui-org/react";

export default function NavBar() {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 bg-transparent`}
    >
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <Link className="text-white font-bold text-xl" href="/">
          EDUAPT
        </Link>

        <div className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link
                className="text-white hover:text-gray-400"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-gray-400" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-gray-400" href="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
