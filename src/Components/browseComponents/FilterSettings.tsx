import InputButton from "../InputButton";
import { useFilter } from "../../Hooks/useFilter";
import Button from "../Button";

function FilterSettings({ notPage }: FilterSettingsProps) {
  const {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minDuration,
    setMinDuration,
    maxDuration,
    setMaxDuration,
    minRatingAverage,
    setMinRatingAverage,
    maxRatingAverage,
    setMaxRatingAverage,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    handleResetState,
  } = useFilter();

  return (
    <section
      className={`flex flex-col gap-4 ${!notPage ? "mt-10 mb-10 px-5" : ""}`}
    >
      {/* Price Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/10">
        <div className="flex items-center gap-2">
          <span className="bg-primary-yellow/20 text-primary-yellow inline-flex h-8 w-8 items-center justify-center rounded-full">
            {/* Price Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <h3 className="text-base font-semibold text-white sm:text-lg">
            Price
          </h3>
        </div>
        <div className="flex w-full gap-2 sm:gap-3">
          <InputButton<number | undefined>
            type="number"
            placeholder={`min`}
            state={minPrice}
            setState={setMinPrice}
          />
          <InputButton<number | undefined>
            type="number"
            placeholder={`max`}
            state={maxPrice}
            setState={setMaxPrice}
          />
        </div>
      </div>

      {/* Duration Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/10">
        <div className="flex items-center gap-2">
          <span className="bg-tertiary-blue/20 text-tertiary-blue inline-flex h-8 w-8 items-center justify-center rounded-full">
            {/* Duration Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <h3 className="text-base font-semibold text-white sm:text-lg">
            Duration (days)
          </h3>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <InputButton<number | undefined>
            type="number"
            placeholder={`min`}
            state={minDuration}
            setState={setMinDuration}
          />
          <InputButton<number | undefined>
            type="number"
            placeholder={`max`}
            state={maxDuration}
            setState={setMaxDuration}
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/10">
        <div className="flex items-center gap-2">
          <span className="bg-primary-yellow/20 text-primary-yellow inline-flex h-8 w-8 items-center justify-center rounded-full">
            {/* Rating Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </span>
          <h3 className="text-base font-semibold text-white sm:text-lg">
            Rating
          </h3>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <InputButton<number | undefined>
            type="number"
            placeholder={`min`}
            state={minRatingAverage}
            setState={setMinRatingAverage}
          />
          <InputButton<number | undefined>
            type="number"
            placeholder={`max`}
            state={maxRatingAverage}
            setState={setMaxRatingAverage}
          />
        </div>
      </div>

      {/* Start Date Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/10">
        <div className="flex items-center gap-2">
          <span className="bg-secondary-blue/20 text-secondary-blue inline-flex h-8 w-8 items-center justify-center rounded-full">
            {/* Date Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </span>
          <h3 className="text-base font-semibold text-white sm:text-lg">
            Start Date
          </h3>
        </div>
        <div className="flex flex-col gap-2 sm:gap-3">
          <InputButton type="date" state={minDate} setState={setMinDate} />
          <InputButton type="date" state={maxDate} setState={setMaxDate} />
        </div>
      </div>

      <Button style="primary" onClick={handleResetState}>
        Reset Filter
      </Button>
    </section>
  );
}

interface FilterSettingsProps {
  notPage?: boolean;
}

export default FilterSettings;
