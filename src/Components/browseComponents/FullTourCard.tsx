import { useParams } from "react-router-dom";
import NavigateBackPage from "../NavigateBackPage";
import data from "../../static/testData.json";
import RatingStars from "./RatingsStars";
import TextWithToggle from "./TextWithToggle";
import LeafletMap from "../../UI/LeafletMap";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import GlobeMap from "../../3DComponents/GlobeMap";
import StartDates from "./StartDates";
import ReviewCard from "./ReviewCard";
import gsap from "gsap";

function FullTourCard() {
  const [view, setView] = useState<boolean>(true);
  const { id, type } = useParams();
  // const sliderRef = useRef<HTMLDivElement | null>(null);
  // const autoScroll = useRef<gsap.core.Tween | null>(null);

  const currentTour =
    type === "tours"
      ? data.tours.filter((tour) => tour.id === +id!)[0]
      : data.cruises.filter((cruise) => cruise.id === +id!)[0];

  const reviewsData = [1, 2, 3, 4, 5];
  const fullReviewsData = [...reviewsData, ...reviewsData];

  // const startAutoScroll = () => {
  //   const slider = sliderRef.current;
  //   if (!slider) return;

  //   const totalScrollDistance = slider.scrollWidth / 2;

  //   if (autoScroll.current) autoScroll.current.kill();

  //   autoScroll.current = gsap.to(slider, {
  //     scrollLeft: totalScrollDistance,
  //     duration: 30,
  //     ease: "linear",
  //     repeat: -1,
  //     onRepeat: () => {
  //       slider.scrollLeft = 0;
  //     },
  //   });
  // };

  // const stopAutoScroll = () => {
  //   if (autoScroll.current) {
  //     autoScroll.current.pause();
  //   }
  // };

  // const resumeAutoScroll = () => {
  //   if (autoScroll.current) {
  //     autoScroll.current.resume();
  //   } else {
  //     startAutoScroll();
  //   }
  // };

  // useEffect(() => {
  //   const timer = setTimeout(startAutoScroll, 100);

  //   return () => {
  //     clearTimeout(timer);
  //     if (autoScroll.current) {
  //       autoScroll.current.kill();
  //     }
  //   };
  // }, []);

  return (
    <section className="mb-10 grid grid-cols-1 gap-y-5 px-10">
      <NavigateBackPage />

      <main className="bg-primary-blue-50 col-start-1 flex flex-col gap-3 rounded-2xl p-5 text-lg">
        <div className="flex flex-wrap items-center justify-between gap-y-3">
          <RatingStars rating={currentTour.ratingsAverage} />
          <h3 className="bg-secondary-blue rounded-[9999px] px-4 py-2">
            {currentTour.ratingsQuantity} reviews
          </h3>
        </div>
        <h2 className="text-3xl">{currentTour.name}</h2>
        <h4>{currentTour.summary}</h4>
        <h2 className="text-4xl">€ {currentTour.price}</h2>
        <h4>{currentTour.duration} day's</h4>
        <img src={currentTour.coverImage} alt="image" />
        <div className="flex flex-wrap gap-3">
          {currentTour.tags.map((tag) => (
            <h4
              key={tag.id}
              className="bg-secondary-blue rounded-[9999px] px-4 py-2"
            >
              {tag.tag}
            </h4>
          ))}
        </div>

        <TextWithToggle text={currentTour.description} />
      </main>

      {/* reviews must be placed here */}
      <div
        // ref={sliderRef}
        className="scrollbar-hide flex w-full gap-5 overflow-x-auto"
        // onMouseEnter={stopAutoScroll} // Pause on desktop hover
        // onMouseLeave={resumeAutoScroll} // Resume on desktop unhover
        // onTouchStart={stopAutoScroll} // Pause on mobile touch start
        // onTouchEnd={resumeAutoScroll} // Resume on mobile touch end
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
              locations={currentTour.locations}
              zoom={5}
            />
          </div>
        ) : (
          <div className="min-h-[50vh]">
            <GlobeMap locations={currentTour.locations} />
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
      <div className="flex flex-col gap-5">
        {currentTour.startDates.map((date) => (
          <StartDates
            key={date.id}
            date={date}
            maxCustomers={currentTour.maxCustomers}
          />
        ))}
      </div>
    </section>
  );
}

export default FullTourCard;
