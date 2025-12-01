import { useState } from "react";
import FilterButton from "../Components/browseComponents/FilterButton";
import InputButton from "../Components/InputButton";
import TourCard from "../Components/browseComponents/TourCard";

// import data from "..//static/testData.json";
import FilterSettings from "../Components/browseComponents/FilterSettings";
import { useFilter } from "../Hooks/useFilter";
import { useQuery } from "@tanstack/react-query";
import { GetAllTours } from "../Api/apiGetAllTours";
import { AxiosError } from "axios";

function Browse() {
  const { search, setSearch } = useFilter();
  const [active, setActive] = useState<boolean>(true);

  const { isPending, data, error, isError } =
    useQuery<TourAndCruiseDateContract>({
      queryKey: ["tour"],
      queryFn: GetAllTours,
      retry: (failureCount, error) => {
        if (error instanceof AxiosError && error.response?.status === 404) {
          return false;
        }
        return failureCount < 1;
      },
      staleTime: 5 * 60 * 1000,
    });

  if (isPending) {
    // implement a loading screen
  }

  if (isError) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      // return a not found
    }
    //  return a errormessage
  }

  if (!data || (!data.tours && !data.cruises)) {
    // return empty page
  }

  console.log(data);

  return (
    <section className="px-5 xl:grid xl:grid-cols-[1fr_3fr] xl:grid-rows-[min-w_min-w_4fr] xl:gap-5">
      <div className="flex gap-5 xl:col-start-1 xl:row-start-1 xl:self-start">
        <InputButton
          placeholder="Search Destinations..."
          state={search}
          setState={setSearch}
        />
        <FilterButton />
      </div>

      <div className="mt-5 flex gap-5 xl:col-start-1 xl:row-start-2 xl:mt-0 xl:self-start">
        <div
          onClick={() => setActive(true)}
          className={`${active ? "bg-secondary-blue" : "bg-primary-blue-50 border-secondary-blue border-2"} col-start-2 flex h-12 w-38 grow cursor-pointer items-center justify-center rounded-4xl`}
        >
          <h2>Tours</h2>
        </div>
        <div
          onClick={() => setActive(false)}
          className={`${!active ? "bg-secondary-blue" : "bg-primary-blue-50 border-secondary-blue border-2"} flex h-12 w-38 grow cursor-pointer items-center justify-center rounded-4xl`}
        >
          <h2>Cruises</h2>
        </div>
      </div>

      <div className="row-start-3 hidden xl:block">
        <FilterSettings notPage={true} />
      </div>

      <div className="mt-6 mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:row-span-3 xl:mt-0">
        {active
          ? data?.tours?.map((tour) => (
              <TourCard key={tour.id} data={tour} type={"tours"} />
            ))
          : data?.cruises?.map((cruise) => (
              <TourCard key={cruise.id} data={cruise} type="cruises" />
            ))}
      </div>
    </section>
  );
}

export default Browse;
