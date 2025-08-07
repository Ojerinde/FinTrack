"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHook";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import {
  SearchIcon,
  CloseIcon,
  HamburgerIcon,
  GridIcon,
} from "@/public/icons/svg-components";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isOpen } = useAppSelector((state) => state.sidebar);

  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header className="flex justify-between items-center py-6" role="banner">
      <div
        className="flex items-center space-x-6 max-sm:space-x-0"
        role="navigation"
      >
        <div className="max-sm:hidden">
          {isOpen ? (
            <CloseIcon
              onClick={() => dispatch(toggleSidebar())}
              className="cursor-pointer "
              aria-label="Close sidebar"
              aria-expanded={isOpen}
              aria-controls="sidebar"
            />
          ) : (
            <HamburgerIcon
              onClick={() => dispatch(toggleSidebar())}
              className="cursor-pointer "
              aria-label="Open sidebar"
              aria-expanded={isOpen}
              aria-controls="sidebar"
            />
          )}
        </div>

        <Image
          src="/images/logo.svg"
          alt="FinTrack Logo"
          width={100}
          height={40}
          className="cursor-pointer"
          aria-label="FinTrack Logo"
          onClick={() => router.push("/dashboard")}
        />

        {searchVisible && (
          <input
            type="text"
            placeholder="Search..."
            className="absolute inset-x-1/4 p-2 rounded-lg border border-gray-300"
            aria-label="Search input"
            role="searchbox"
          />
        )}
      </div>
      <div className="flex items-center space-x-8" role="toolbar">
        <SearchIcon
          className="cursor-pointer"
          onClick={toggleSearch}
          aria-label="Toggle search"
          aria-expanded={searchVisible}
        />
        <GridIcon className="cursor-pointer" aria-label="View grid" />

        <Image
          src="/images/user-1.svg"
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full"
          aria-label="User Avatar"
        />
      </div>
    </header>
  );
};

export default Header;
