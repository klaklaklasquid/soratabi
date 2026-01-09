import { useState, useEffect } from "react";
import FilterButton from "../Components/browseComponents/FilterButton";
import InputButton from "../Components/InputButton";
import TourCard from "../Components/browseComponents/TourCard";
import FilterSettings from "../Components/browseComponents/FilterSettings";
import Pagination from "../Components/browseComponents/Pagination";
import { useFilter } from "../Hooks/useFilter";
import { usePagination } from "../Hooks/usePagination";
import { useQuery } from "@tanstack/react-query";
import { GetAllTours } from "../Api/apiGetAllTours";
import { retryLogic } from "@/Utils/queryUtils";
import Loading from "../UI/Loading";
import Empty from "../UI/Empty";
import NotFound from "../UI/NotFound";
import ErrorMessage from "../UI/ErrorMessage";
import BlurSpot from "../UI/BlurSpot";
import { AxiosError } from "axios";

function Browse() {
  const { search, setSearch } = useFilter();
  const { toursPage, cruisesPage, setToursPage, setCruisesPage } =
    usePagination();
  const [active, setActive] = useState<boolean>(true);

  const { isLoading, data, error, isError, isFetching } =
    useQuery<TourAndCruiseDateContract>({
      queryKey: ["tours", toursPage, cruisesPage],
      queryFn: () => GetAllTours(toursPage, cruisesPage),
      retry: retryLogic,
      staleTime: 5 * 60 * 1000,
    });

  const currentPagination = active
    ? data?.toursPagination
    : data?.cruisesPagination;
  const currentPage = active ? toursPage : cruisesPage;
  const setCurrentPage = active ? setToursPage : setCruisesPage;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [toursPage, cruisesPage]);

  if (isError) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return <NotFound />;
    } else {
      return <ErrorMessage message={error?.message} />;
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (isTours: boolean) => {
    setActive(isTours);
  };

  return (
    <section className="mt-5 px-5 xl:grid xl:grid-cols-[1fr_3fr] xl:grid-rows-[min-w_min-w_4fr] xl:gap-5 xl:px-12">
      <div className="grid lg:gap-y-5">
        <div className="flex gap-3 xl:col-start-1 xl:row-start-1 xl:self-start">
          <InputButton
            placeholder="Search Destinations..."
            state={search}
            setState={setSearch}
          />
          <FilterButton />
        </div>

        <div className="mt-5 flex gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md xl:col-start-1 xl:row-start-2 xl:mt-0 xl:self-start">
          <button
            onClick={() => handleTabChange(true)}
            className={`flex h-10 flex-1 items-center justify-center rounded-full px-6 text-sm font-medium transition-all duration-300 ${
              active
                ? "bg-secondary-blue shadow-secondary-blue/50 text-white shadow-lg"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            Tours
          </button>
          <button
            onClick={() => handleTabChange(false)}
            className={`flex h-10 flex-1 items-center justify-center rounded-full px-6 text-sm font-medium transition-all duration-300 ${
              !active
                ? "bg-secondary-blue shadow-secondary-blue/50 text-white shadow-lg"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            Cruises
          </button>
        </div>

        <div className="row-start-3 hidden xl:block">
          <FilterSettings notPage={true} />
        </div>
      </div>

      <div className="mt-5 mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:row-span-3 xl:mt-0">
        {isLoading || isFetching ? (
          <Loading />
        ) : !data ||
          (!data.tours && !data.cruises) ||
          (data.tours.length === 0 && data.cruises.length === 0) ? (
          <Empty />
        ) : active ? (
          data.tours.map((tour) => (
            <TourCard key={tour.id} data={tour} type={"tours"} />
          ))
        ) : (
          data.cruises.map((cruise) => (
            <TourCard key={cruise.id} data={cruise} type="cruises" />
          ))
        )}
      </div>

      <Pagination
        pagination={currentPagination!}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Decorative blurred spots - using BlurSpot component */}
      <BlurSpot
        color="bg-primary-blue-50"
        className="top-1/4 left-0 h-48 w-48 sm:h-72 sm:w-72"
        opacity="opacity-60"
        blur="blur-[80px] sm:blur-[100px]"
      />
      <BlurSpot
        color="bg-primary-yellow/50"
        className="top-1/3 right-0 h-40 w-40 sm:h-56 sm:w-56"
        opacity="opacity-50"
        blur="blur-[80px] sm:blur-[100px]"
      />
      <BlurSpot
        color="bg-secondary-blue/30"
        className="right-0 bottom-1/4 h-64 w-64 sm:right-1/4 sm:h-96 sm:w-96"
        opacity="opacity-40"
        blur="blur-[100px] sm:blur-[120px]"
      />
      <BlurSpot
        color="bg-primary-yellow/50"
        className="top-2/3 left-0 h-40 w-40 sm:h-56 sm:w-56"
        opacity="opacity-50"
        blur="blur-[80px] sm:blur-[100px]"
      />
    </section>
  );
}

export default Browse;
