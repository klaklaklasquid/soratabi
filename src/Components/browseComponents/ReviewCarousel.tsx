import ReviewCard from "./ReviewCard";
import ReviewEmpty from "./ReviewEmpty";
import Loading from "@/UI/Loading";
import ErrorMessage from "@/UI/ErrorMessage";

interface ReviewCarouselProps {
  reviewLoading: boolean;
  reviewIsError: boolean;
  reviewError: Error | null;
  reviewsData: ReviewResponse[] | undefined;
  emblaRef: (node: HTMLDivElement | null) => void;
}

function ReviewCarousel({
  reviewLoading,
  reviewIsError,
  reviewError,
  reviewsData,
  emblaRef,
}: ReviewCarouselProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      {reviewLoading ? (
        <div className="py-5">
          <Loading />
        </div>
      ) : reviewIsError ? (
        <div className="py-5">
          <ErrorMessage message={reviewError?.message} />
        </div>
      ) : !reviewsData || reviewsData.length === 0 ? (
        <ReviewEmpty />
      ) : (
        <div className="w-full overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="mx-auto flex max-w-md gap-6 px-4 py-6 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            {reviewsData.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewCarousel;
