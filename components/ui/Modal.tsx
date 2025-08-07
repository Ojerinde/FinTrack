// components/ui/Modal.tsx
"use client";
import React from "react";
import { createPortal } from "react-dom";
import Loading from "./Loading";

interface OverlayProps {
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
  height?: string;
  position?: { x: number; y: number };
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  width,
  height,
  position,
}) => {
  const positionStyles = position
    ? {
        position: "fixed" as const,
        top: position.y,
        left: position.x,
        transform: "none",
      }
    : {
        position: "fixed" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };

  return (
    <div
      style={{
        width,
        height,
        ...positionStyles,
      }}
      className="z-50 p-6 bg-white rounded-lg shadow-lg overflow-auto"
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
      className="fixed inset-0 bg-black bg-opacity-50 z-30"
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
  position?: { x: number; y: number };
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  width,
  height,
  position,
}) => {
  if (typeof window !== "undefined") {
    return (
      <>
        {createPortal(
          <Overlay
            onClose={onClose}
            width={width}
            height={height}
            position={position}
          >
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
