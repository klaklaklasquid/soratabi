import { useMyJourneyQueries } from "@/Hooks/useMyJourneyQueries";
import Loading from "@/UI/Loading";
import ErrorMessage from "@/UI/ErrorMessage";
import JourneyTourCard from "@/Components/journeyComponents/JourneyTourCard";

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
  } = useMyJourneyQueries();

  if (isLoadingUpcoming || isLoadingCompleted) {
    return <Loading />;
  }

  if (isErrorUpcoming || isErrorCompleted) {
    return (
      <ErrorMessage
        message={
          upcomingError?.message ||
          completedError?.message ||
          "Failed to load tours"
        }
      />
    );
  }

  console.log("Upcoming Tours:", upcomingTours);
  console.log("Completed Tours:", completedTours);

  return (
    <div className="container mx-auto p-6">
      {/* Upcoming Tours Section */}
      <section className="mb-12">
        <h1 className="mb-6 text-3xl font-bold text-white">Upcoming Tours</h1>
        {upcomingTours && upcomingTours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTours.map((tour) => (
              <JourneyTourCard key={tour.id} data={tour} status="upcoming" />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No upcoming tours found.</p>
        )}
      </section>

      {/* Completed Tours Section */}
      <section>
        <h1 className="mb-6 text-3xl font-bold text-white">Completed Tours</h1>
        {completedTours && completedTours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedTours.map((tour) => (
              <JourneyTourCard key={tour.id} data={tour} status="completed" />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No completed tours found.</p>
        )}
      </section>
    </div>
  );
}

export default Journey;
