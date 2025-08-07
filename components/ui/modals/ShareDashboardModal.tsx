"use client";
import React from "react";
import Modal from "./Modal";
import { CloseIcon } from "@/public/icons/svg-components";
import {
  FaTwitter,
  FaFacebook,
  FaRedditAlien,
  FaDiscord,
  FaWhatsapp,
  FaFacebookMessenger,
  FaTelegramPlane,
  FaWeixin,
} from "react-icons/fa";
import path from "path";
import { usePathname } from "next/navigation";

interface ShareDashboardModalProps {
  onClose: () => void;
}

const ShareDashboardModal: React.FC<ShareDashboardModalProps> = ({
  onClose,
}) => {
  const pathname = usePathname();
  const socialMediaButtons = [
    { icon: <FaTwitter className="text-blue-500 w-8 h-8" />, label: "Twitter" },
    {
      icon: <FaFacebook className="text-blue-600 w-8 h-8" />,
      label: "Facebook",
    },
    {
      icon: <FaRedditAlien className="text-orange-600 w-8 h-8" />,
      label: "Reddit",
    },
    {
      icon: <FaDiscord className="text-indigo-700 w-8 h-8" />,
      label: "Discord",
    },
    {
      icon: <FaWhatsapp className="text-green-500 w-8 h-8" />,
      label: "WhatsApp",
    },
    {
      icon: <FaFacebookMessenger className="text-blue-400 w-8 h-8" />,
      label: "Messenger",
    },
    {
      icon: <FaTelegramPlane className="text-blue-400 w-8 h-8" />,
      label: "Telegram",
    },
    { icon: <FaWeixin className="text-green-500 w-8 h-8" />, label: "WeChat" },
  ];

  return (
    <Modal
      onClose={onClose}
      width="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
      height="auto"
    >
      <div
        role="dialog"
        aria-labelledby="share-modal-title"
        aria-hidden="false"
      >
        <div className="flex justify-between items-center">
          <h2
            id="share-modal-title"
            className="text-xl font-bold text-primary-dark"
          >
            Share
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-800"
          >
            <CloseIcon className="w-6 h-6" aria-label="Close modal" />
          </button>
        </div>

        <div
          className="my-8 grid grid-cols-4 gap-10 mb-4 justify-items-center"
          role="group"
          aria-labelledby="share-icons"
        >
          {socialMediaButtons.map((button, index) => (
            <button
              key={index}
              aria-label={`Share on ${button.label}`}
              className="hover:bg-sidebar-active transition-colors duration-150 p-3 rounded-full"
            >
              {button.icon}
              <span className="sr-only">{button.label}</span>
            </button>
          ))}
        </div>

        <div className="">
          <label
            htmlFor="page-link"
            className="text-sm font-medium text-primary-dark"
          >
            Page Link
          </label>
          <input
            type="text"
            id="page-link"
            value={pathname}
            readOnly
            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
            aria-describedby="page-link-description"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ShareDashboardModal;
