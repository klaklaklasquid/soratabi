import { Card } from "@/Components/ui/card";
import RatingStars from "./RatingsStars";

function ReviewCard({ review }: { review: ReviewResponse }) {
  const reviewDate = new Date(review.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="border-secondary-blue/30 hover:border-secondary-blue/50 flex w-80 min-w-72 shrink-0 flex-col gap-4 rounded-3xl border-2 bg-white/50 p-6 shadow-lg backdrop-blur-xl transition-all select-none hover:scale-105 hover:shadow-xl sm:min-w-80">
      {/* Header with user info and rating */}
      <div className="flex items-start justify-between">
        <div className="flex flex-1 items-center gap-3">
          <img
            src={review.userPhoto}
            alt={review.userName}
            className="ring-secondary-blue/40 h-12 w-12 rounded-full object-cover ring-2"
          />
          <div className="flex flex-col">
            <h3 className="text-primary-blue text-base font-bold drop-shadow-sm">
              {review.userName}
            </h3>
            <p className="text-xs font-medium text-gray-600">{reviewDate}</p>
          </div>
        </div>
        {/* Rating badge */}
        <div className="bg-primary-yellow/90 flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-sm">
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
      <p className="text-sm leading-relaxed font-medium text-gray-800">
        {review.review}
      </p>
    </Card>
  );
}

export default ReviewCard;
