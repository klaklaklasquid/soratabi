import { useParams } from "react-router-dom";
import NavigateBackPage from "../NavigateBackPage";

import RatingStars from "./RatingsStars";
import TextWithToggle from "./TextWithToggle";
import LeafletMap from "../../UI/LeafletMap";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import GlobeMap from "../../3DComponents/GlobeMap";
import StartDates from "./StartDates";
import ReviewCard from "./ReviewCard";
import gsap from "gsap";
import { useTourById } from "../../Hooks/useTourById";
import { AxiosError } from "axios";

function FullTourCard() {
  const [view, setView] = useState<boolean>(true);
  const { id } = useParams(); // type deleted
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const autoScroll = useRef<gsap.core.Tween | null>(null);
  const { isPending, data, error, isError } = useTourById(+id!);

  const reviewsData = [1, 2, 3, 4, 5];
  const fullReviewsData = [...reviewsData, ...reviewsData];

  const startAutoScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const totalScrollDistance = slider.scrollWidth / 2;

    if (autoScroll.current) autoScroll.current.kill();

    autoScroll.current = gsap.to(slider, {
      scrollLeft: totalScrollDistance,
      duration: 30,
      ease: "linear",
      repeat: -1,
      onRepeat: () => {
        slider.scrollLeft = 0;
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(startAutoScroll, 100);

    return () => {
      clearTimeout(timer);
      if (autoScroll.current) {
        autoScroll.current.kill();
      }
    };
  }, []);

  if (isPending) {
    // implement a loading screen
  }

  if (isError) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      // return a not found
    }
    //  return a errormessage
  }

  if (!data) {
    // return empty page
    return null;
  }

  return (
    <section className="mb-10 grid grid-cols-1 gap-5 px-5 xl:grid-cols-2">
      <NavigateBackPage />

      <main className="bg-primary-blue-50 col-start-1 flex flex-col gap-3 rounded-2xl p-5 text-lg md:grid md:grid-cols-2">
        <div className="flex flex-wrap items-center justify-between gap-y-3 md:col-span-2">
          <RatingStars rating={data.ratingsAverage} />
          <h3 className="bg-secondary-blue rounded-[9999px] px-4 py-2">
            {data.ratingsQuantity} reviews
          </h3>
        </div>
        <h2 className="text-3xl">{data.name}</h2>
        <h4 className="md:row-start-3">{data.summary}</h4>
        <h2 className="text-4xl">€ {data.price}</h2>
        <h4>{data.duration} day's</h4>
        <img src={data.coverImage} alt="image" />
        <div className="flex flex-wrap gap-3 md:col-span-2 md:row-start-5">
          {data.tags.map((tag) => (
            <h4
              key={tag.id}
              className="bg-secondary-blue self-center justify-self-center rounded-[9999px] px-4 py-2"
            >
              {tag.tag}
            </h4>
          ))}
        </div>

        <TextWithToggle text={data.description} />
      </main>

      {/* reviews must be placed here */}
      <div
        ref={sliderRef}
        className="scrollbar-hide flex w-full gap-5 overflow-x-auto xl:col-span-2 xl:row-start-2"
      >
        {fullReviewsData.map((reviewId, index) => (
          <ReviewCard key={`${reviewId}-${index}`} />
        ))}
      </div>

      {/* map */}
      <section className="flex flex-col gap-3 text-lg">
        {view ? (
          <div className="bg-primary-blue-50 rounded-2xl p-5">
            <LeafletMap
              className="min-h-[500px] w-full overflow-hidden rounded-xl"
              locations={data.locations}
              zoom={5}
            />
          </div>
        ) : (
          <div className="min-h-[50vh]">
            <GlobeMap locations={data.locations} />
          </div>
        )}

        <div className="flex flex-col gap-5">
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
      </section>

      {/* startDates */}
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 xl:col-span-2 2xl:grid-cols-4">
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
