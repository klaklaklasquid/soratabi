import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useScrollLock } from "@/Hooks/useScrollLock";

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
  useScrollLock(isOpen);

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
      <div className="animate-in zoom-in-95 border-secondary-blue/30 from-primary-blue/20 to-secondary-blue/20 relative w-full max-w-xl rounded-2xl border bg-linear-to-br p-5 shadow-sm backdrop-blur-xl duration-300 sm:rounded-3xl sm:p-12">
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="border-secondary-blue/40 bg-secondary-blue/30 hover:border-secondary-blue/60 hover:bg-secondary-blue/50 absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border text-white shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-90 hover:shadow-sm active:scale-95 sm:top-6 sm:right-6 sm:h-12 sm:w-12"
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="pointer-events-none text-lg sm:text-xl"
          />
        </button>

        {/* Title */}
        <h2 className="mb-6 pr-12 text-2xl font-extrabold text-white drop-shadow-sm sm:mb-10 sm:pr-16 sm:text-4xl">
          {title}
        </h2>

        {/* Tour Name Highlight */}
        {highlightedText && (
          <div className="border-tertiary-blue/50 from-tertiary-blue/30 to-secondary-blue/30 mb-6 rounded-xl border bg-linear-to-r px-4 py-4 shadow-sm backdrop-blur-md sm:mb-10 sm:rounded-2xl sm:px-8 sm:py-6">
            <p className="text-center text-lg font-extrabold text-white drop-shadow-sm sm:text-2xl">
              {highlightedText}
            </p>
          </div>
        )}

        {/* Message */}
        <div className="mb-8 sm:mb-12">
          <p className="mb-2 text-base leading-relaxed font-semibold text-gray-100 drop-shadow-sm sm:text-lg">
            {message}
          </p>
          <p className="text-sm font-medium text-gray-300 drop-shadow-sm sm:text-base">
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={onClose}
            className="border-secondary-blue/40 bg-secondary-blue/30 hover:border-secondary-blue/60 hover:bg-secondary-blue/50 flex flex-1 items-center justify-center rounded-full border px-6 py-3 text-base font-bold text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-sm active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`${confirmColor} flex flex-1 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-bold text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-sm active:scale-95 sm:px-8 sm:py-4 sm:text-lg`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
