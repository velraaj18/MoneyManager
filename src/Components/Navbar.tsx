import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-semibold">MoneyManager</div>

          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-300">
              Dashboard
            </a>
            <a href="#" className="hover:text-gray-300">
              Transactions
            </a>
            <a href="#" className="hover:text-gray-300">
              Accounts
            </a>
            <a href="#" className="hover:text-gray-300">
              Reports
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="#" className="block hover:text-gray-300">
            Dashboard
          </a>
          <a href="#" className="block hover:text-gray-300">
            Transactions
          </a>
          <a href="#" className="block hover:text-gray-300">
            Accounts
          </a>
          <a href="#" className="block hover:text-gray-300">
            Reports
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
