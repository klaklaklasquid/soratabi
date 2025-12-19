import { Card } from "@/Components/ui/card";
import RatingStars from "./RatingsStars";

function ReviewCard({ review }: { review: ReviewResponse }) {
  const reviewDate = new Date(review.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="flex w-80 min-w-72 shrink-0 flex-col gap-4 rounded-3xl border-none bg-white/40 p-6 shadow-lg backdrop-blur-md transition-transform select-none hover:scale-105 sm:min-w-80">
      {/* Header with user info and rating */}
      <div className="flex items-start justify-between">
        <div className="flex flex-1 items-center gap-3">
          <img
            src={review.userPhoto}
            alt={review.userName}
            className="ring-primary-blue/20 h-12 w-12 rounded-full object-cover ring-2"
          />
          <div className="flex flex-col">
            <h3 className="text-primary-blue text-base font-bold">
              {review.userName}
            </h3>
            <p className="text-xs text-gray-500">{reviewDate}</p>
          </div>
        </div>
        {/* Rating badge */}
        <div className="bg-primary-yellow flex w-12 items-center justify-center rounded-full py-1.5 shadow-md">
          <span className="text-primary-blue text-sm font-bold">
            {review.rating}
          </span>
        </div>
      </div>

      {/* Rating stars */}
      <div className="-mt-1">
        <RatingStars rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-sm leading-relaxed text-gray-700">{review.review}</p>
    </Card>
  );
}

export default ReviewCard;
