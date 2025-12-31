import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  highlightedText?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
}

function ConfirmationPopup({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  highlightedText,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-secondary-blue hover:bg-primary-blue",
}: ConfirmationPopupProps) {
  // Prevent scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-primary-blue/30 fixed inset-0 z-9999 flex items-center justify-center overflow-hidden px-4 backdrop-blur-2xl"
      onClick={handleBackdropClick}
    >
      <div className="animate-in zoom-in-95 border-secondary-blue/30 from-primary-blue/20 to-secondary-blue/20 relative w-full max-w-xl rounded-3xl border bg-linear-to-br p-12 shadow-2xl backdrop-blur-xl duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="border-secondary-blue/40 bg-secondary-blue/30 hover:border-secondary-blue/60 hover:bg-secondary-blue/50 absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border text-white shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-90 hover:shadow-2xl active:scale-95"
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="pointer-events-none text-xl"
          />
        </button>

        {/* Title */}
        <h2 className="mb-8 pr-16 text-4xl font-extrabold text-white drop-shadow-2xl">
          {title}
        </h2>

        {/* Tour Name Highlight */}
        {highlightedText && (
          <div className="bg-primary-blue mb-8 rounded-2xl px-8 py-6 shadow-sm backdrop-blur-xs">
            <p className="text-center text-2xl font-extrabold text-white drop-shadow-2xl">
              "{highlightedText}"
            </p>
          </div>
        )}

        {/* Message */}
        <div className="mb-10">
          <p className="mb-2 text-lg leading-relaxed font-semibold text-gray-100 drop-shadow-lg">
            {message}
          </p>
          <p className="text-base font-medium text-gray-300 drop-shadow-md">
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="border-secondary-blue/40 bg-secondary-blue/30 hover:border-secondary-blue/60 hover:bg-secondary-blue/50 flex flex-1 items-center justify-center rounded-full border px-8 py-4 text-lg font-bold text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`${confirmColor} flex flex-1 items-center justify-center rounded-full border border-white/30 px-8 py-4 text-lg font-bold text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-2xl active:scale-95`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
