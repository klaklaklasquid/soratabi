import { useParams } from "react-router-dom";

import RatingStars from "./RatingsStars";
import TextWithToggle from "./TextWithToggle";
import LeafletMap from "../../UI/LeafletMap";
import Button from "../Button";
import { useState } from "react";
import GlobeMap from "../../3DComponents/GlobeMap";
import StartDates from "./StartDates";
import ReviewCard from "./ReviewCard";
import { useTourById } from "../../Hooks/useTourById";
import { AxiosError } from "axios";
import Loading from "../../UI/Loading";
import NotFound from "../../UI/NotFound";
import ErrorMessage from "../../UI/ErrorMessage";
import Empty from "../../UI/Empty";

function FullTourCard() {
  const [view, setView] = useState<boolean>(true);
  const { id } = useParams();
  const { isPending, data, error, isError } = useTourById(+id!);

  // Example reviews, replace with real data if available
  const reviewsData = [1, 2, 3, 4, 5];
  const [reviewIndex, setReviewIndex] = useState(0);
  // Swipe state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const handlePrevReview = () =>
    setReviewIndex((i) => (i === 0 ? reviewsData.length - 1 : i - 1));
  const handleNextReview = () =>
    setReviewIndex((i) => (i === reviewsData.length - 1 ? 0 : i + 1));
  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      if (distance > 50) {
        handleNextReview();
      } else if (distance < -50) {
        handlePrevReview();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  function getReviewsPerView() {
    if (window.innerWidth >= 1280) return 3; // xl and up
    if (window.innerWidth >= 768) return 2; // md and up
    return 1; // mobile
  }

  if (isPending) {
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

  return (
    <section className="mx-5 mt-10 mb-10 flex flex-col gap-5 md:mx-20 lg:mx-40 xl:mx-80">
      {/* Hero/Info Panel */}
      <div className="relative flex flex-col gap-5 rounded-3xl bg-white/30 p-0 shadow-lg backdrop-blur-md">
        <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
          <img
            src={data.coverImage}
            alt="image"
            className="h-full w-full object-contain"
          />
          <div className="bg-secondary-blue/90 absolute top-4 left-4 rounded-full px-5 py-2 text-xs font-bold text-white shadow-lg">
            {data.tags.map((tag) => tag.tag).join(", ")}
          </div>
        </div>
        <div className="flex flex-col gap-2 px-6 py-4">
          <div className="flex items-center justify-between">
            <RatingStars rating={data.ratingsAverage} />
            <span className="bg-secondary-blue rounded-full px-4 py-2 text-white">
              {data.ratingsQuantity} reviews
            </span>
          </div>
          <h2 className="text-primary-blue text-3xl font-bold">{data.name}</h2>
          <h4 className="text-lg text-gray-700">{data.summary}</h4>
          <div className="flex gap-4">
            <span className="bg-primary-yellow/80 text-primary-blue rounded-full px-4 py-1 text-lg font-bold shadow">
              € {data.price}
            </span>
            <span className="bg-primary-blue/80 rounded-full px-4 py-1 text-lg font-medium text-white shadow">
              {data.duration}-Day
            </span>
          </div>
          <TextWithToggle text={data.description} />
        </div>
      </div>

      {/* Review Carousel */}
      <div className="flex w-full flex-col items-center gap-4">
        <h3 className="text-primary-blue mb-2 text-xl font-semibold">
          Reviews
        </h3>
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center md:max-w-2xl lg:max-w-4xl">
          {/* Hide arrows on mobile, show on md+ */}
          <button
            className="bg-primary-blue/80 hover:bg-primary-blue absolute left-2 z-10 hidden h-10 w-10 items-center justify-center rounded-full text-white shadow-lg md:flex"
            onClick={handlePrevReview}
            aria-label="Previous review"
          >
            &#8592;
          </button>
          <div
            className="flex w-full touch-pan-x justify-center overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex justify-center transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${reviewIndex * (100 / getReviewsPerView())}%)`,
                width: `${reviewsData.length * (100 / getReviewsPerView())}%`,
              }}
            >
              {reviewsData.map((id) => (
                <div
                  key={id}
                  className="flex shrink-0 justify-center"
                  style={{ width: `calc(100% / ${getReviewsPerView()})` }}
                >
                  <ReviewCard />
                </div>
              ))}
            </div>
          </div>
          <button
            className="bg-primary-blue/80 hover:bg-primary-blue absolute right-2 z-10 hidden h-10 w-10 items-center justify-center rounded-full text-white shadow-lg md:flex"
            onClick={handleNextReview}
            aria-label="Next review"
          >
            &#8594;
          </button>
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {reviewsData.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                idx === reviewIndex
                  ? "bg-primary-yellow border-primary-blue border-2 shadow-lg"
                  : "bg-gray-300"
              } `}
            />
          ))}
        </div>
      </div>

      {/* Map/Globe Switcher */}
      <section className="flex flex-col gap-3 text-lg">
        <div className="mb-2 flex flex-col justify-center gap-3 xl:flex-row">
          <Button
            onClick={() => setView(true)}
            style={view ? "primary" : "secondary"}
          >
            Map View
          </Button>
          <Button
            onClick={() => setView(false)}
            style={view ? "secondary" : "primary"}
          >
            Globe View
          </Button>
        </div>
        {view ? (
          <div className="bg-primary-blue-50 rounded-2xl p-5">
            <LeafletMap
              className="min-h-[400px] w-full overflow-hidden rounded-xl"
              locations={data.locations}
              zoom={5}
            />
          </div>
        ) : (
          <div className="min-h-[40vh]">
            <GlobeMap locations={data.locations} />
          </div>
        )}
      </section>

      {/* Start Dates */}
      <div className="flex flex-col gap-5">
        {data.startDates.map((date) => (
          <StartDates
            key={date.id}
            date={date}
            maxCustomers={data.maxCustomers}
          />
        ))}
      </div>
    </section>
  );
}

export default FullTourCard;
