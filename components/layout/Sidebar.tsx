"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHook";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import { FaClipboardList, FaChartBar, FaCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const { isOpen } = useAppSelector((state) => state.sidebar);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <MdDashboard className="h-4 w-4" />,
    },
    {
      name: "Transactions",
      link: "/transactions",
      icon: <FaClipboardList className="h-4 w-4" />,
    },
    {
      name: "Reports",
      link: "/reports",
      icon: <FaChartBar className="h-4 w-4" />,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <FaCog className="h-4 w-4" />,
    },
  ];

  const isActive = (item: any) => {
    return (
      pathname === item.link || (pathname === "/" && item.name === "Dashboard")
    );
  };

  return (
    <>
      {/* Desktop Sidebar  */}
      <aside
        className={`hidden lg:block ${isOpen ? "w-64" : "w-16"} h-full`}
        aria-labelledby="sidebar"
        role="navigation"
      >
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index} role="menuitem">
                {isOpen ? (
                  <Link
                    href={item.link}
                    className={`flex items-center space-x-3 rounded-full px-4 py-[0.35rem] transition-colors duration-200 ${
                      isActive(item)
                        ? "bg-sidebar-active text-sidebar-text-active font-medium"
                        : "text-primary-dark hover:bg-gray-100"
                    }`}
                    aria-label={item.name}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <div className="cursor-pointer flex justify-center py-2">
                    <div
                      aria-hidden="true"
                      onClick={() => router.push(item.link)}
                      className={`p-2 rounded transition-colors duration-200 ${
                        isActive(item)
                          ? "bg-sidebar-active text-sidebar-text-active"
                          : "text-primary-dark hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation  */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-around items-center py-2 px-4 safe-area-inset-bottom">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors duration-200 ${
                isActive(item)
                  ? "text-sidebar-text-active"
                  : "text-primary-dark hover:text-sidebar-text-active"
              }`}
              aria-label={item.name}
              role="menuitem"
            >
              {/* Icon Container */}
              <div
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isActive(item) ? "bg-sidebar-active" : "hover:bg-gray-100"
                }`}
              >
                {React.cloneElement(item.icon, {
                  className: "h-5 w-5",
                })}
              </div>

              {/* Label */}
              <span className="text-xs mt-1 font-medium truncate max-w-full">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
