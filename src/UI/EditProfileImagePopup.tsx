import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useScrollLock } from "@/Hooks/useScrollLock";
import { useState } from "react";

interface EditProfileImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (image: File) => void;
  currentImage?: string;
  isUploading: boolean;
}

function EditProfileImagePopup({
  isOpen,
  onClose,
  onSave,
  currentImage,
  isUploading,
}: EditProfileImagePopupProps) {
  useScrollLock(isOpen);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImage) {
      onSave(selectedImage);
    }
  };

  const displayImage = previewUrl || currentImage;

  return (
    <div
      className="bg-primary-blue/30 fixed inset-0 z-9999 flex items-center justify-center overflow-hidden px-4 backdrop-blur-2xl"
      onClick={handleBackdropClick}
    >
      <div className="animate-in zoom-in-95 border-secondary-blue/30 from-primary-blue/40 to-secondary-blue/40 relative w-full max-w-xl rounded-2xl border bg-linear-to-br p-5 shadow-sm backdrop-blur-xl duration-300 sm:rounded-3xl sm:p-12">
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
          Change Profile Image
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Image Preview */}
          <div className="flex justify-center">
            <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-white/20 shadow-lg">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="Profile preview"
                  className="min-h-full min-w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/10 text-4xl text-gray-400">
                  ?
                </div>
              )}
            </div>
          </div>

          {/* File Input */}
          <div>
            <label
              htmlFor="profileImage"
              className="mb-2 block text-base font-bold text-white drop-shadow-sm sm:mb-3 sm:text-lg"
            >
              Select New Image
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border-secondary-blue/40 focus:border-tertiary-blue/60 focus:ring-tertiary-blue/40 w-full rounded-xl border bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-sm backdrop-blur-md transition-all duration-300 file:mr-4 file:rounded-lg file:border-0 file:bg-white/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-white/30 focus:ring-2 focus:outline-none sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
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
              disabled={isUploading || !selectedImage}
              className="bg-primary-yellow hover:bg-primary-yellow/80 text-primary-blue flex flex-1 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-bold shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:px-8 sm:py-4 sm:text-lg"
            >
              {isUploading ? "Uploading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileImagePopup;
