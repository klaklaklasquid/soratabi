import { useParams } from "react-router-dom";
import NavigateBackPage from "../NavigateBackPage";
import data from "../../static/testData.json";
import RatingStars from "./RatingsStars";
import TextWithToggle from "./TextWithToggle";
import LeafletMap from "../../UI/LeafletMap";
import Button from "../Button";
import { useState } from "react";
import Globe from "../../3DComponents/Globe";
import { Canvas } from "@react-three/fiber";

function FullTourCard() {
  const [view, setView] = useState<boolean>(true);

  const { id, type } = useParams();

  const currentTour =
    type === "tours"
      ? data.tours.filter((tour) => tour.id === +id!)[0]
      : data.cruises.filter((cruise) => cruise.id === +id!)[0];

  console.log(currentTour.ratingsAverage);

  return (
    <section className="mb-10 grid grid-cols-1 gap-y-5 px-5">
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
            <h4 className="bg-secondary-blue rounded-[9999px] px-4 py-2">
              {tag.tag}
            </h4>
          ))}
        </div>

        <TextWithToggle text={currentTour.description} />
      </main>

      {/* reviews must be placed here */}

      {/* map */}
      <section className="flex flex-col gap-3 text-lg">
        {view ? (
          <div className="bg-primary-blue-50 rounded-2xl p-5">
            <LeafletMap
              className="min-h-[500px] w-full overflow-hidden rounded-xl"
              locations={currentTour.locations}
              zoom={4}
            />
          </div>
        ) : (
          <div className="min-h-[250px]">
            <Canvas camera={{ fov: 60, position: [0, 0, 2] }}>
              <ambientLight intensity={1.5} />
              <Globe />
            </Canvas>
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
    </section>
  );
}

export default FullTourCard;
