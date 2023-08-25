import { useAtom } from "jotai";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import * as state from "@/utils/state";
import Link from "next/link";
interface DropdownProps {
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [User] = useAtom(state.User);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative hidden md:inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white focus:outline-none "
          onClick={toggleMenu}
        >
          {children}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 w-32 rounded-md shadow-lg bg-[#121212] mt-2 z-50 ">
          <div
            className="py-1 z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href="/likes"
              className="flex items-center space-x-1 px-4 py-2 text-sm text-[#424242] bg-[#121212] z-50 "
              role="menuitem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>{" "}
              <span>Likes</span>
            </Link>
            {User!.staff && (
              <>
                <Link
                  href="/unreviewed"
                  className="flex items-center space-x-1 px-4 py-2 text-sm text-[#424242] bg-[#121212] z-50"
                  role="menuitem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  <span>Unreviewed</span>
                </Link>
              </>
            )}
            <div className="flex items-center justify-center w-full">
              <div className="my-1 bg-[#3d3c3c] h-[1px] w-[70%]"></div>
            </div>
            <Link
              href="/api/logout"
              className="flex items-center space-x-1 px-4 py-2 text-sm text-red-500 bg-[#121212] z-50"
              role="menuitem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              <span>Logout</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
