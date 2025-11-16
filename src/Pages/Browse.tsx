import { useState } from "react";
import FilterButton from "../Components/browseComponents/FilterButton";
import InputButton from "../Components/InputButton";
import TourCard from "../Components/browseComponents/TourCard";

import data from "..//static/testData.json";

function Browse() {
  const [active, setActive] = useState<boolean>(true);

  return (
    <section className="">
      <div className="grid grid-cols-[0.5fr_1fr_1fr_0.5fr]">
        <InputButton />
        <FilterButton />
      </div>

      <div className="mt-5 grid grid-cols-[0.5fr_1fr_1fr_0.5fr] gap-5">
        <div
          onClick={() => setActive(true)}
          className={`${active ? "bg-secondary-blue" : "bg-primary-blue-50 border-secondary-blue border-2"} col-start-2 flex h-12 w-38 cursor-pointer items-center justify-center rounded-4xl`}
        >
          <h2>Tours</h2>
        </div>
        <div
          onClick={() => setActive(false)}
          className={`${!active ? "bg-secondary-blue" : "bg-primary-blue-50 border-secondary-blue border-2"} flex h-12 w-38 cursor-pointer items-center justify-center rounded-4xl`}
        >
          <h2>Cruises</h2>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {active
          ? data.tours.map((tour) => <TourCard key={tour.id} data={tour} />)
          : data.cruises.map((cruise) => (
              <TourCard key={cruise.id} data={cruise} />
            ))}
      </div>
    </section>
  );
}

export default Browse;
