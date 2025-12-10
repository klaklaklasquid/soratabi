import { useParams } from "react-router-dom";

import RatingStars from "./RatingsStars";
import TextWithToggle from "./TextWithToggle";
import LeafletMap from "../../UI/LeafletMap";
import Button from "../Button";
import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import GlobeMap from "../../3DComponents/GlobeMap";
import StartDates from "./StartDates";
import ReviewCard from "./ReviewCard";
import { useTourById } from "../../Hooks/useTourById";
import { AxiosError } from "axios";
import Loading from "../../UI/Loading";
import NotFound from "../../UI/NotFound";
import ErrorMessage from "../../UI/ErrorMessage";
import Empty from "../../UI/Empty";
import BlurSpot from "../../UI/BlurSpot";

function FullTourCard() {
  const [view, setView] = useState<boolean>(true);
  const { id } = useParams();
  const { isPending, data, error, isError } = useTourById(+id!);

  // Example reviews, replace with real data if available
  const reviewsData = [1, 2, 3, 4, 5, 6, 7];
  const [emblaRef] = useEmblaCarousel({ loop: true, startIndex: 2 }, [
    Autoplay({ delay: 3500 }),
  ]);

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
      {/* Hero/Info Panel - image as right-side background */}
      <div className="relative flex min-h-80 flex-col gap-0 overflow-hidden rounded-3xl bg-white/30 shadow-lg backdrop-blur-md md:flex-row">
        {/* Info Panel Left */}
        <div className="z-10 flex flex-col gap-2 px-6 py-8 md:w-1/2">
          <div className="mb-2 flex items-center justify-between">
            <RatingStars rating={data.ratingsAverage} />
            <span className="bg-secondary-blue rounded-full px-4 py-2 text-white">
              {data.ratingsQuantity} reviews
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

      {/* Review Carousel - shadcn Card + Embla */}
      <div className="flex w-full flex-col items-center gap-4 overflow-hidden">
        <h3 className="text-primary-blue mb-2 text-xl font-semibold">
          Reviews
        </h3>
        <div className="relative mx-auto w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <div
            className="overflow-visible rounded-3xl backdrop-blur-md"
            ref={emblaRef}
          >
            <div className="flex gap-6 px-4 py-6">
              {reviewsData.map((id) => (
                <ReviewCard key={id} />
              ))}
            </div>
          </div>
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
