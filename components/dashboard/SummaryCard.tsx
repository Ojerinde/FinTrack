"use client";
import React from "react";

import { formatCurrency, formatPercentage } from "@/utils/formatters";
import { OptionsIcon } from "@/public/icons/svg-components";

interface SummaryCardProps {
  title: string;
  value: number;
  change: number;
  isTransactionCard?: boolean;
  onActionClick: (e: React.MouseEvent) => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  change,
  isTransactionCard,
  onActionClick,
}) => {
  const isIncrease = change >= 0;

  return (
    <article
      className="bg-card-bg rounded-[1.2rem] p-6 text-white"
      role="article"
      aria-label={`${title} summary card`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-primary-dark text-md font-bold" role="heading">
          {title}
        </h3>
        <OptionsIcon
          fill="black"
          onClick={onActionClick}
          className="cursor-pointer"
          aria-label="Open options menu"
        />
      </div>
      <div
        className="text-primary-dark text-3xl font-bold mt-3 my-1"
        role="text"
      >
        {isTransactionCard ? value : formatCurrency(value, "USD")}
      </div>
      <div
        className={`text-sm text-primary-light ${
          isIncrease ? "text-primary-light" : "text-error-color"
        }`}
        role="text"
        aria-label={`Change: ${formatPercentage(change)} ${
          isIncrease ? "increase" : "decrease"
        }`}
      >
        {formatPercentage(change)}
      </div>
    </article>
  );
};

export default SummaryCard;
