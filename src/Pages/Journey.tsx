import { useMyJourneyQueries } from "@/Hooks/useMyJourneyQueries";
import Loading from "@/UI/Loading";
import ErrorMessage from "@/UI/ErrorMessage";
import JourneyTourCard from "@/Components/journeyComponents/JourneyTourCard";
import UserReviewCard from "@/Components/journeyComponents/UserReviewCard";

function Journey() {
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
        <h1 className="mb-6 text-3xl font-bold text-white">Completed Tours</h1>
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
  );
}

export default Journey;
