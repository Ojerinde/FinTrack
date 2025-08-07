"use client";
import React, { useState, useCallback } from "react";
import TransactionTable from "@/components/dashboard/TransactionTable";
import UserAvatars from "@/components/dashboard/UserAvatars";
import TabNavigation from "@/components/dashboard/TabNavigation";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { mockDashboardSummary } from "@/store/data/mockData";
import { ArrowDownIcon, OptionsIcon } from "@/public/icons/svg-components";
import ShareDashboardModal from "@/components/ui/modals/ShareDashboardModal";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const toggleActiveStatus = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const openShareModal = useCallback(() => {
    setIsShareModalOpen(true);
  }, []);

  const closeShareModal = useCallback(() => {
    setIsShareModalOpen(false);
  }, []);

  return (
    <main className="pl-10 pb-8 max-sm:pl-0 max-sm:pb-40" role="main">
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0"
        role="banner"
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-2xl font-bold text-primary-dark">
              Wallet Ledger
            </h1>
            <ArrowDownIcon
              className="w-3 h-3 text-primary-dark cursor-pointer"
              aria-label="Expand wallet ledger options"
            />
            <button
              onClick={toggleActiveStatus}
              className="ml-3 flex items-center gap-2 bg-card-bg rounded-full py-1 px-2"
              aria-label={`Toggle status to ${
                isActive ? "Inactive" : "Active"
              }`}
              aria-pressed={isActive}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-dot-color" : "bg-gray-400"
                }`}
              />
              <span className={`text-sm text-primary-dark"`}>
                {isActive ? "Active" : "Inactive"}
              </span>
            </button>
          </div>
        </div>

        <div
          className="flex items-center gap-3 self-start sm:self-auto"
          role="toolbar"
        >
          <button
            onClick={openShareModal}
            className="px-4 py-2 bg-[#4B8B9F] hover:bg-[#4b8c9fd9] text-deep-dark rounded-full transition-colors duration-200 font-medium"
            aria-label="Share dashboard"
          >
            Share
          </button>
          <div
            className="cursor-pointer border h-10 w-10 flex justify-center items-center rounded-[43%] hover:bg-gray-100 transition-colors duration-200"
            aria-label="Open options menu"
            role="button"
          >
            <OptionsIcon />
          </div>
        </div>
      </div>

      <UserAvatars />

      <TabNavigation
        onTabChange={handleTabChange}
        activeTab={activeTab}
        aria-label="Dashboard tabs"
      />

      <div className="mt-4 sm:mt-6" role="region" aria-label="Summary cards">
        <SummaryCards summary={mockDashboardSummary} />
      </div>

      {activeTab === "transactions" && (
        <div
          className="mt-4 sm:mt-6"
          role="region"
          aria-label="Transaction table"
        >
          <TransactionTable />
        </div>
      )}

      {isShareModalOpen && <ShareDashboardModal onClose={closeShareModal} />}
    </main>
  );
};

export default React.memo(Dashboard);
