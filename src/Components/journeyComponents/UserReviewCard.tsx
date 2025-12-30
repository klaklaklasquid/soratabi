import { Card } from "@/Components/ui/card";
import RatingStars from "../browseComponents/RatingsStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function UserReviewCard({ review }: { review: ReviewResponse }) {
  const reviewDate = new Date(review.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="flex w-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl">
      {/* Header with tour info and rating */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="text-xl font-bold text-white drop-shadow-lg">
            {review.tourName}
          </h3>
          <p className="text-sm font-medium text-gray-300">{reviewDate}</p>
        </div>
        {/* Rating badge */}
        <div className="bg-primary-yellow/80 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 shadow-lg backdrop-blur-sm">
          <span className="text-primary-blue text-lg font-bold">
            {review.rating}
          </span>
        </div>
      </div>

      {/* Rating stars */}
      <div className="-mt-1">
        <RatingStars rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-sm leading-relaxed font-medium text-gray-100">
        {review.review}
      </p>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          className="bg-secondary-blue hover:bg-primary-blue flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <FontAwesomeIcon icon={faPencil} />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="bg-tertiary-red hover:bg-tertiary-red/80 flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <FontAwesomeIcon icon={faTrash} />
          <span>Delete</span>
        </button>
      </div>
    </Card>
  );
}

export default UserReviewCard;
