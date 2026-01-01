import { Card } from "@/Components/ui/card";
import RatingStars from "./RatingsStars";

function ReviewCard({ review }: { review: ReviewResponse }) {
  const reviewDate = new Date(review.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="flex w-80 min-w-72 shrink-0 flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md transition-all duration-300 select-none hover:scale-105 hover:shadow-2xl sm:min-w-80">
      {/* Header with user info and rating */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <img
            src={review.userPhoto}
            alt={review.userName}
            className="h-12 w-12 rounded-full border-2 border-white/20 object-cover shadow-lg"
          />
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-white drop-shadow-lg">
              {review.userName}
            </h3>
            <p className="text-xs font-medium text-gray-300">{reviewDate}</p>
          </div>
        </div>
        {/* Rating badge */}
        <div className="bg-primary-yellow/80 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 shadow-lg backdrop-blur-sm">
          <span className="text-primary-blue text-base font-bold">
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
    </Card>
  );
}

export default ReviewCard;
