"use client";
import React from "react";
import SummaryCard from "./SummaryCard";
import { DashboardSummary } from "@/types";
import { useAppDispatch } from "@/hooks/useReduxHook";

interface SummaryCardsProps {
  summary: DashboardSummary;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const dispatch = useAppDispatch();

  const cards = [
    {
      title: "Total Balance",
      value: summary.totalBalance,
      change: summary.balanceChange,
    },
    {
      title: "Total Credits",
      value: summary.totalCredits,
      change: summary.creditsChange,
    },
    {
      title: "Total Debits",
      value: summary.totalDebits,
      change: summary.debitsChange,
    },
    {
      title: "Transactions",
      value: summary.transactionCount,
      change: summary.transactionChange,
    },
  ];

  return (
    <section className="" role="region" aria-label="Dashboard summary cards">
      <h2
        className="text-primary-dark text-lg font-bold mt-8 mb-3"
        role="heading"
      >
        Summary
      </h2>
      <div
        className="flex flex-col sm:flex-row gap-8 overflow-x-auto"
        role="list"
      >
        {cards.map((card, index) => (
          <div key={index} className="flex-1 min-w-0" role="listitem">
            <SummaryCard
              title={card.title}
              value={card.value}
              change={card.change}
              isTransactionCard={card.title === "Transactions"}
              onActionClick={(e) => {}}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SummaryCards;
