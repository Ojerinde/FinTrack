"use client";
import React from "react";

interface TabNavigationProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  onTabChange,
  activeTab,
}) => {
  const tabs = [
    { name: "Overview", value: "overview" },
    { name: "Transactions", value: "transactions" },
  ];

  const handleTabClick = (tabValue: string) => {
    onTabChange(tabValue);
  };

  return (
    <nav
      className="mt-8 border-b-2 border-[#DAE0E2]"
      role="tablist"
      aria-label="Dashboard tabs"
    >
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`pb-2 px-8 font-medium transition-colors duration-200 relative ${
              tab.value.toLowerCase() === activeTab.toLowerCase()
                ? "text-primary-accent"
                : "text-primary-grey hover:text-gray-900"
            }`}
            onClick={() => handleTabClick(tab.value)}
            role="tab"
            aria-selected={tab.value.toLowerCase() === activeTab.toLowerCase()}
            aria-controls={`panel-${tab.value}`}
            id={`tab-${tab.value}`}
          >
            {tab.name}
            {tab.value.toLowerCase() === activeTab.toLowerCase() && (
              // <div className="absolute -bottom-[1.6] left-0 w-full border-b-2 border-button-bg" />
              <div className="absolute bottom-0 left-0 w-full border-b-2 border-button-bg" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;
