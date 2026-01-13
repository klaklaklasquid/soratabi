import { useParams } from "react-router-dom";
import { useMemo } from "react";
import LeafletMap from "../../UI/LeafletMap";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import StartDates from "./StartDates";
import ReviewCarousel from "./ReviewCarousel";
import StartDatesEmpty from "./StartDatesEmpty";
import { useTourById } from "../../Hooks/useTourById";
import { AxiosError } from "axios";
import Loading from "../../UI/Loading";
import NotFound from "../../UI/NotFound";
import ErrorMessage from "../../UI/ErrorMessage";
import Empty from "../../UI/Empty";
import BlurSpot from "../../UI/BlurSpot";
import { parseDate } from "@/Utils/dateFormatter";
import { useReviewByTourId } from "@/Hooks/useReviewByTourId";
import FullCardHeroSection from "./FullCardHeroSection";

function FullTourCard() {
  const { id } = useParams();
  const { isLoading, data, error, isError } = useTourById(+id!);
  const {
    isLoading: reviewLoading,
    data: reviewsData,
    error: reviewError,
    isError: reviewIsError,
    stats,
  } = useReviewByTourId(+id!);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: reviewsData && reviewsData.length >= 5,
      startIndex: 0,
      align: "center",
      containScroll: false,
    },
    reviewsData && reviewsData.length >= 5 ? [Autoplay({ delay: 3500 })] : [],
  );

  const futureDates = useMemo(() => {
    if (!data?.startDates) return [];

    const now = new Date();
    return data.startDates
      .filter((date) => parseDate(date.startDate) > now)
      .sort((a, b) => {
        const dateA = parseDate(a.startDate);
        const dateB = parseDate(b.startDate);
        return dateA.getTime() - dateB.getTime();
      });
  }, [data?.startDates]);

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return <NotFound />;
    }
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <ErrorMessage message={error?.message} />
      </div>
    );
  }

  if (!data) {
    return <Empty />;
  }

  return (
    <section className="mx-5 mt-10 mb-10 flex flex-col gap-5 md:mx-20 lg:mx-40 xl:mx-80">
      {/* Hero/Info Panel - image as right-side background */}
      <FullCardHeroSection stats={stats} data={data} />

      {/* Review Carousel - shadcn Card + Embla */}
      <ReviewCarousel
        reviewLoading={reviewLoading}
        reviewIsError={reviewIsError}
        reviewError={reviewError}
        reviewsData={reviewsData}
        emblaRef={emblaRef}
      />

      {/* Map/Globe Switcher */}
      <section className="flex flex-col gap-3 text-lg">
        <div className="bg-primary-blue-50 rounded-2xl p-5">
          <LeafletMap
            className="min-h-[400px] w-full overflow-hidden rounded-xl"
            locations={data.locations}
            zoom={5}
          />
        </div>
      </section>

      {/* Start Dates */}
      <div className="flex flex-col gap-5">
        {futureDates.length > 0 ? (
          futureDates.map((date) => (
            <StartDates
              key={date.id}
              date={date}
              maxCustomers={data.maxCustomers}
            />
          ))
        ) : (
          <StartDatesEmpty />
        )}
      </div>

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

export default FullTourCard;
