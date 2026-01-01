import { useParams, useSearchParams } from "react-router-dom";
import LeafletMap from "@/UI/LeafletMap";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ReviewCard from "@/Components/browseComponents/ReviewCard";
import ReviewEmpty from "@/Components/browseComponents/ReviewEmpty";
import { useTourById } from "@/Hooks/useTourById";
import { AxiosError } from "axios";
import Loading from "@/UI/Loading";
import NotFound from "@/UI/NotFound";
import ErrorMessage from "@/UI/ErrorMessage";
import Empty from "@/UI/Empty";
import BlurSpot from "@/UI/BlurSpot";
import { useReviewByTourId } from "@/Hooks/useReviewByTourId";
import FullCardHeroSection from "@/Components/browseComponents/FullCardHeroSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useDownloadPdf } from "@/Hooks/useDownloadPdf";

function InfoTourPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const startDateId = searchParams.get("startDateId");

  const { isLoading, data, error, isError } = useTourById(+id!);
  const {
    isLoading: reviewLoading,
    data: reviewsData,
    error: reviewError,
    isError: reviewIsError,
    stats,
  } = useReviewByTourId(+id!);

  const downloadPdfMutation = useDownloadPdf();

  const [emblaRef] = useEmblaCarousel(
    {
      loop: reviewsData && reviewsData.length >= 5,
      startIndex: 0,
      align: "center",
      containScroll: false,
    },
    reviewsData && reviewsData.length >= 5 ? [Autoplay({ delay: 3500 })] : [],
  );

  const handleDownloadPdf = () => {
    if (id && startDateId) {
      downloadPdfMutation.mutate({
        tourId: +id,
        startDateId: +startDateId,
      });
    }
  };

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

  // Find the selected start date
  const selectedStartDate = startDateId
    ? data.startDates.find((date) => date.id === +startDateId)
    : null;

  const formattedDate = selectedStartDate
    ? new Date(selectedStartDate.startDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <section className="mx-5 mt-10 mb-10 flex flex-col gap-5 md:mx-20 lg:mx-40 xl:mx-80">
      {/* Hero/Info Panel */}
      <FullCardHeroSection stats={stats} data={data} />

      {/* Selected Start Date Info */}
      {selectedStartDate && (
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-300 sm:text-xl">
              Booked Tour Date
            </h3>
            <span className="text-2xl font-extrabold text-white drop-shadow-sm sm:text-3xl">
              {formattedDate}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="bg-primary-yellow/80 text-primary-blue rounded-full border border-white/20 px-5 py-2 text-sm font-bold shadow-lg backdrop-blur-sm sm:text-base">
              {data.duration} Days
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm sm:text-base">
              {selectedStartDate.currentCustomers}/{data.maxCustomers} Guests
            </span>
          </div>
        </div>
      )}

      {/* Review Carousel */}
      <div className="flex w-full flex-col items-center gap-4">
        <div className="w-full overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="mx-auto flex max-w-md gap-6 px-4 py-6 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            {reviewLoading ? (
              <Loading />
            ) : reviewIsError ? (
              <ErrorMessage message={reviewError?.message} />
            ) : !reviewsData || reviewsData.length === 0 ? (
              <ReviewEmpty />
            ) : (
              reviewsData.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <section className="flex flex-col gap-3 text-lg">
        <div className="bg-primary-blue-50 rounded-2xl p-5">
          <LeafletMap
            className="min-h-[400px] w-full overflow-hidden rounded-xl"
            locations={data.locations}
            zoom={5}
          />
        </div>
      </section>

      {/* PDF Download Button */}
      <button
        onClick={handleDownloadPdf}
        disabled={downloadPdfMutation.isPending}
        className="bg-tertiary-red hover:bg-tertiary-red/80 flex items-center justify-center gap-2 self-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:text-base"
      >
        <FontAwesomeIcon icon={faFilePdf} />
        <span>
          {downloadPdfMutation.isPending ? "Generating..." : "Download PDF"}
        </span>
      </button>

      {/* Decorative blurred spots */}
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

export default InfoTourPage;
