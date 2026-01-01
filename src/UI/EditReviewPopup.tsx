import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useScrollLock } from "@/Hooks/useScrollLock";

interface EditReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rating: number, review: string) => void;
  review: ReviewResponse;
}

const ReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(0.5, "Rating must be at least 0.5")
    .max(5, "Rating must be at most 5")
    .required("Rating is required"),
  review: Yup.string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must be at most 1000 characters")
    .required("Review is required"),
});

function EditReviewPopup({
  isOpen,
  onClose,
  onSave,
  review,
}: EditReviewPopupProps) {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  useScrollLock(isOpen);

  const formik = useFormik({
    initialValues: {
      rating: review.rating,
      review: review.review,
    },
    validationSchema: ReviewSchema,
    onSubmit: (values) => {
      onSave(values.rating, values.review);
    },
  });

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStarClick = (star: number, isHalf: boolean) => {
    const rating = isHalf ? star - 0.5 : star;
    formik.setFieldValue("rating", rating);
  };

  const displayRating = hoveredRating || formik.values.rating;

  const reviewDate = new Date(review.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="bg-primary-blue/30 fixed inset-0 z-9999 flex items-center justify-center overflow-hidden px-4 backdrop-blur-2xl"
      onClick={handleBackdropClick}
    >
      <div className="animate-in zoom-in-95 border-secondary-blue/30 from-primary-blue/20 to-secondary-blue/20 relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border bg-linear-to-br p-5 shadow-sm backdrop-blur-xl duration-300 sm:rounded-3xl sm:p-10">
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
        <h2 className="mb-4 pr-12 text-2xl font-extrabold text-white drop-shadow-sm sm:mb-8 sm:pr-16 sm:text-4xl">
          Edit Review
        </h2>

        {/* Tour Name */}
        <div className="border-tertiary-blue/50 from-tertiary-blue/30 to-secondary-blue/30 mb-4 rounded-xl border bg-linear-to-r px-4 py-4 shadow-sm backdrop-blur-md sm:mb-8 sm:rounded-2xl sm:px-8 sm:py-6">
          <p className="text-center text-lg font-extrabold text-white drop-shadow-sm sm:text-2xl">
            {review.tourName}
          </p>
          <p className="mt-2 text-center text-sm font-medium text-gray-300">
            Reviewed on {reviewDate}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Rating Section */}
          <div>
            <label className="mb-2 block text-base font-bold text-white drop-shadow-sm sm:mb-3 sm:text-lg">
              Your Rating
            </label>
            <div className="flex items-center gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFullStar = displayRating >= star;
                const isHalfStar =
                  displayRating >= star - 0.5 && displayRating < star;
                const isEmpty = displayRating < star - 0.5;

                return (
                  <div
                    key={star}
                    className="relative cursor-pointer"
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    {/* Full star background (gray or yellow) */}
                    <FontAwesomeIcon
                      icon={faStar}
                      className={`text-3xl transition-colors sm:text-5xl ${
                        isFullStar
                          ? "text-yellow-400 drop-shadow-sm"
                          : isEmpty
                            ? "text-gray-500"
                            : "text-gray-500"
                      }`}
                    />

                    {/* Half star overlay */}
                    {isHalfStar && (
                      <div
                        className="pointer-events-none absolute inset-0 overflow-hidden"
                        style={{ width: "50%" }}
                      >
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-3xl text-yellow-400 drop-shadow-sm sm:text-5xl"
                        />
                      </div>
                    )}

                    {/* Click areas */}
                    <div
                      className="absolute inset-0"
                      style={{ width: "50%" }}
                      onMouseEnter={() => setHoveredRating(star - 0.5)}
                      onClick={() => handleStarClick(star, true)}
                    />
                    <div
                      className="absolute inset-0 left-1/2"
                      style={{ width: "50%" }}
                      onMouseEnter={() => setHoveredRating(star)}
                      onClick={() => handleStarClick(star, false)}
                    />
                  </div>
                );
              })}
              <span className="ml-2 text-xl font-bold text-white drop-shadow-sm sm:ml-3 sm:text-2xl">
                {displayRating.toFixed(1)}
              </span>
            </div>
            {formik.touched.rating && formik.errors.rating && (
              <p className="mt-2 text-sm font-medium text-red-400">
                {formik.errors.rating}
              </p>
            )}
          </div>

          {/* Review Text Section */}
          <div>
            <label
              htmlFor="review"
              className="mb-2 block text-base font-bold text-white drop-shadow-sm sm:mb-3 sm:text-lg"
            >
              Your Review
            </label>
            <textarea
              id="review"
              name="review"
              rows={6}
              className="border-secondary-blue/40 focus:border-tertiary-blue/60 focus:ring-tertiary-blue/40 w-full rounded-xl border bg-white/10 px-4 py-3 text-sm font-medium text-white placeholder-gray-400 shadow-sm backdrop-blur-md transition-all duration-300 focus:ring-2 focus:outline-none sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
              placeholder="Share your experience..."
              value={formik.values.review}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="mt-2 flex justify-between">
              {formik.touched.review && formik.errors.review ? (
                <p className="text-sm font-medium text-red-400">
                  {formik.errors.review}
                </p>
              ) : (
                <p className="text-sm font-medium text-gray-300">
                  {formik.values.review.length} / 1000 characters
                </p>
              )}
            </div>
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
              disabled={!formik.isValid || !formik.dirty}
              className="bg-primary-yellow hover:bg-primary-yellow/80 text-primary-blue flex flex-1 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-bold shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:px-8 sm:py-4 sm:text-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditReviewPopup;
