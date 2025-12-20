import RatingStars from "@/Components/browseComponents/RatingsStars";
import SelectedDateDisplay from "@/Components/browseComponents/SelectedDateDisplay";
import TextWithToggle from "@/Components/browseComponents/TextWithToggle";
import { useReviewByTourId } from "@/Hooks/useReviewByTourId";
import { useTourById } from "@/Hooks/useTourById";
import BlurSpot from "@/UI/BlurSpot";
import Empty from "@/UI/Empty";
import ErrorMessage from "@/UI/ErrorMessage";
import Loading from "@/UI/Loading";
import NotFound from "@/UI/NotFound";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

function PurchaseTour() {
  const { id, dateId } = useParams();
  const { isLoading, data, error, isError } = useTourById(+id!);
  const { stats } = useReviewByTourId(+id!);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return <NotFound />;
    }
    return <ErrorMessage message={error?.message} />;
  }

  if (!data) {
    return <Empty />;
  }

  // Find the selected date
  const selectedDate = data.startDates.find(
    (date) => date.id === Number(dateId),
  );

  if (!selectedDate) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ErrorMessage message="Selected date not found" />
      </div>
    );
  }

  const handleSubmit = async (
    values: { tickets: number },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      // TODO: Implement actual API call to purchase tour
      console.log("Purchase Data:", {
        tourId: id,
        dateId: dateId,
        ...values,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert(
        `Successfully booked ${values.tickets} ticket(s) for ${data.name}!`,
      );
      // Navigate to success page or user's bookings
      // navigate("/bookings");
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-5 mt-10 mb-10 flex flex-col gap-5 md:mx-20 lg:mx-40 xl:mx-80">
      {/* Hero/Info Panel - image as right-side background */}
      <div className="relative flex min-h-80 flex-col gap-0 overflow-hidden rounded-3xl bg-white/30 shadow-lg backdrop-blur-md md:flex-row">
        {/* Info Panel Left */}
        <div className="z-10 flex flex-col gap-2 px-6 py-8 md:w-1/2">
          <div className="mb-2 flex items-center justify-between">
            <RatingStars
              rating={stats ? stats.averageRating : data.ratingsAverage}
            />
            <span className="bg-secondary-blue rounded-full px-4 py-2 text-white">
              {stats ? stats.totalReviews : data.ratingsQuantity} reviews
            </span>
          </div>
          <h2 className="text-primary-blue text-3xl font-bold">{data.name}</h2>
          <h4 className="text-lg text-gray-700">{data.summary}</h4>
          <div className="my-2 flex gap-4">
            <span className="bg-primary-yellow/80 text-primary-blue rounded-full px-4 py-1 text-lg font-bold shadow">
              € {data.price}
            </span>
            <span className="bg-primary-blue/80 rounded-full px-4 py-1 text-lg font-medium text-white shadow">
              {data.duration}-Day
            </span>
          </div>
          <TextWithToggle text={data.description} />
        </div>
        {/* Image Right */}
        <div
          className="flex min-h-[220px] w-full items-end justify-end md:min-h-8 md:w-1/2"
          style={{
            backgroundImage: `url(${data.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center 15%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-secondary-blue/90 absolute right-4 bottom-4 rounded-full px-5 py-2 text-xs font-bold text-white shadow-lg">
            {data.tags.map((tag) => tag.tag).join(", ")}
          </div>
        </div>
      </div>

      {/* Selected Date Display with Purchase Form */}
      <SelectedDateDisplay
        date={selectedDate}
        maxCustomers={data.maxCustomers}
        tourPrice={data.price}
        onSubmit={handleSubmit}
      />

      {/* Decorative blurred spots - using BlurSpot component */}
      <BlurSpot
        color="bg-tertiary-blue/20"
        className="top-1/4 left-0 h-48 w-48 sm:h-72 sm:w-72"
        blur="blur-[80px] sm:blur-[100px]"
      />
      <BlurSpot
        color="bg-secondary-blue/20"
        className="right-0 bottom-1/4 h-64 w-64 sm:right-1/4 sm:h-96 sm:w-96"
        blur="blur-[100px] sm:blur-[120px]"
      />
    </section>
  );
}

export default PurchaseTour;
