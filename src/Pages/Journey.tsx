import { useMyJourneyQueries } from "@/Hooks/useMyJourneyQueries";
import Loading from "@/UI/Loading";
import ErrorMessage from "@/UI/ErrorMessage";
import JourneyTourCard from "@/Components/journeyComponents/JourneyTourCard";
import UserReviewCard from "@/Components/journeyComponents/UserReviewCard";
import ConfirmationPopup from "@/UI/ConfirmationPopup";
import EditReviewPopup from "@/UI/EditReviewPopup";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteReview, UpdateReview } from "@/Api/apiReviews";

function Journey() {
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);
  const [deleteReviewName, setDeleteReviewName] = useState<string>("");
  const [deleteTourId, setDeleteTourId] = useState<number | null>(null);
  const [editReview, setEditReview] = useState<ReviewResponse | null>(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: ({ reviewId, tourId }: { reviewId: string; tourId: number }) =>
      DeleteReview(reviewId, tourId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviewsStats"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      reviewId,
      tourId,
      rating,
      review,
    }: {
      reviewId: string;
      tourId: number;
      rating: number;
      review: string;
    }) => UpdateReview(reviewId, tourId, { rating, review }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviewsStats"] });
    },
  });

  const {
    upcomingTours,
    isLoadingUpcoming,
    isErrorUpcoming,
    upcomingError,
    completedTours,
    isLoadingCompleted,
    isErrorCompleted,
    completedError,
    myReviewData,
    myReviewLoading,
    myReviewError,
    myReviewIsError,
  } = useMyJourneyQueries();

  const handleDeleteClick = (
    reviewId: string,
    tourName: string,
    tourId: number,
  ) => {
    setDeleteReviewId(reviewId);
    setDeleteReviewName(tourName);
    setDeleteTourId(tourId);
  };

  const handleDeleteConfirm = () => {
    if (deleteReviewId && deleteTourId) {
      deleteMutation.mutate(
        { reviewId: deleteReviewId, tourId: deleteTourId },
        {
          onSuccess: () => {
            setDeleteReviewId(null);
            setDeleteReviewName("");
            setDeleteTourId(null);
          },
        },
      );
    }
  };

  const handleEditClick = (review: ReviewResponse) => {
    setEditReview(review);
  };

  const handleEditSave = (rating: number, reviewText: string) => {
    if (editReview) {
      updateMutation.mutate(
        {
          reviewId: editReview.id,
          tourId: editReview.tourId,
          rating,
          review: reviewText,
        },
        {
          onSuccess: () => {
            setEditReview(null);
          },
        },
      );
    }
  };

  if (isLoadingUpcoming || isLoadingCompleted || myReviewLoading) {
    return <Loading />;
  }

  if (isErrorUpcoming || isErrorCompleted || myReviewIsError) {
    return (
      <ErrorMessage
        message={
          upcomingError?.message ||
          completedError?.message ||
          myReviewError?.message ||
          "Failed to load tours"
        }
      />
    );
  }

  return (
    <>
      <div className="container mx-auto p-6">
        {/* Upcoming Tours Section */}
        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold text-white">Upcoming Tours</h1>
          {upcomingTours && upcomingTours.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingTours.map((tour, index) => (
                <JourneyTourCard
                  key={`upcoming-${tour.id}-${index}`}
                  data={tour}
                  status="upcoming"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No upcoming tours found.</p>
          )}
        </section>

        {/* Completed Tours Section */}
        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold text-white">
            Completed Tours
          </h1>
          {completedTours && completedTours.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedTours.map((tour, index) => (
                <JourneyTourCard
                  key={`completed-${tour.id}-${index}`}
                  data={tour}
                  status="completed"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No completed tours found.</p>
          )}
        </section>

        {/* My Reviews Section */}
        <section>
          <h1 className="mb-6 text-3xl font-bold text-white">My Reviews</h1>
          {myReviewData && myReviewData.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {myReviewData.map((review, index) => (
                <UserReviewCard
                  key={`review-${review.id}-${index}`}
                  review={review}
                  onDelete={() =>
                    handleDeleteClick(review.id, review.tourName, review.tourId)
                  }
                  onEdit={() => handleEditClick(review)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No reviews yet. Share your experiences!
            </p>
          )}
        </section>
      </div>

      <ConfirmationPopup
        isOpen={deleteReviewId !== null}
        onClose={() => {
          setDeleteReviewId(null);
          setDeleteReviewName("");
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Review"
        message="Are you sure you want to delete this review?"
        highlightedText={deleteReviewName}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="bg-tertiary-red hover:bg-tertiary-red/80"
      />

      {editReview && (
        <EditReviewPopup
          isOpen={!!editReview}
          review={editReview}
          onClose={() => setEditReview(null)}
          onSave={handleEditSave}
        />
      )}
    </>
  );
}

export default Journey;
