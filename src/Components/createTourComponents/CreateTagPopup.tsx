import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useScrollLock } from "@/Hooks/useScrollLock";

interface CreateTagPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  tagValue: string;
  onTagChange: (value: string) => void;
  isCreating: boolean;
}

function CreateTagPopup({
  isOpen,
  onClose,
  onCreate,
  tagValue,
  onTagChange,
  isCreating,
}: CreateTagPopupProps) {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagValue.trim()) {
      onCreate();
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
          Create New Tag
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Tag Input */}
          <div>
            <label
              htmlFor="tag"
              className="mb-2 block text-base font-bold text-white drop-shadow-sm sm:mb-3 sm:text-lg"
            >
              Tag Name
            </label>
            <input
              id="tag"
              type="text"
              value={tagValue}
              onChange={(e) => onTagChange(e.target.value)}
              className="border-secondary-blue/40 focus:border-tertiary-blue/60 focus:ring-tertiary-blue/40 w-full rounded-xl border bg-white/10 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 shadow-sm backdrop-blur-md transition-all duration-300 focus:ring-2 focus:outline-none sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
              placeholder="Adventure"
              autoFocus
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border-secondary-blue/40 bg-secondary-blue/30 hover:border-secondary-blue/60 hover:bg-secondary-blue/50 flex flex-1 items-center justify-center rounded-full border px-6 py-3 text-base font-bold text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-sm active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || !tagValue.trim()}
              className="bg-primary-yellow hover:bg-primary-yellow/80 text-primary-blue flex flex-1 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-bold shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:px-8 sm:py-4 sm:text-lg"
            >
              {isCreating ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTagPopup;
