// components/ui/Modal.tsx
"use client";
import React from "react";
import { createPortal } from "react-dom";
import Loading from "../Loading";

interface OverlayProps {
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
  height?: string;
}

const Overlay: React.FC<OverlayProps> = ({ children, width, height }) => {
  return (
    <div
      style={{
        width,
        height,
      }}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-6 bg-white rounded-md shadow-lg overflow-auto ultra-thin-scrollbar mb-10`}
    >
      {children}
    </div>
  );
};

const Backdrop: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClose();
        }
      }}
      className="fixed inset-0 bg-[#D9D9D9B2] bg-opacity-50 z-30"
      role="button"
      tabIndex={0}
    />
  );
};

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, width, height }) => {
  if (typeof window !== "undefined") {
    return (
      <>
        {createPortal(
          <Overlay onClose={onClose} width={width} height={height}>
            {children}
          </Overlay>,
          document.body
        )}
        {createPortal(<Backdrop onClose={onClose} />, document.body)}
      </>
    );
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default Modal;
