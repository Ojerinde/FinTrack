import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export const HamburgerIcon: React.FC<IconProps> = ({
  width = 20,
  height = 14,
  fill = "#1B2528",
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 20 14"
    className={className}
    onClick={onClick}
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M1 7.25h18m-18-6h18m-18 12h18"
    ></path>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  width = 22,
  height = 32,
  fill = "#1B2528",
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    onClick={onClick}
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5 5l10 10M15 5l-10 10"
    ></path>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  fill = "#1B2528",
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    onClick={onClick}
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m19 19.25-4.35-4.35M17 9.25a8 8 0 1 1-16 0 8 8 0 0 1 16 0"
    ></path>
  </svg>
);

export const OptionsIcon: React.FC<IconProps> = ({
  width = 18,
  height = 5,
  fill = "#1B2528",
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 18 5"
    className={className}
    onClick={onClick}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M2 .25a2 2 0 1 0 0 4 2 2 0 0 0 0-4m5 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const GridIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  fill = "#1B2528",
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    onClick={onClick}
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M8 1.25H1v7h7zM19 1.25h-7v7h7zM19 12.25h-7v7h7zM8 12.25H1v7h7z"
    ></path>
  </svg>
);

export const ArrowDownIcon: React.FC<IconProps> = ({
  width = 10,
  height = 6,
  fill = "#15272D",
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 10 6"
    className={className}
    onClick={onClick}
  >
    <path
      fill={fill}
      fillOpacity="0.62"
      d="M2.863.25C1.65.25 1.045.25.765.49a1 1 0 0 0-.348.838c.03.368.458.797 1.314 1.653L3.87 5.12c.396.396.594.594.822.668a1 1 0 0 0 .618 0c.228-.074.426-.272.822-.668L8.27 2.98c.856-.856 1.285-1.285 1.314-1.653A1 1 0 0 0 9.235.49C8.955.25 8.35.25 7.137.25z"
    ></path>
  </svg>
);
