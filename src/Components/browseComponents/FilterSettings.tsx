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
      className={`flex flex-col gap-5 ${!notPage ? "mt-10 mb-10 px-5" : ""}`}
    >
      {/* Price Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/30 p-4 shadow-sm backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2">
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
                d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8"
              />
            </svg>
          </span>
          <h3 className="text-lg font-semibold text-white">Price</h3>
        </div>
        <div className="flex w-full gap-3">
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
      <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/30 p-4 shadow-sm backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2">
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
                d="M12 6v6l4 2"
              />
            </svg>
          </span>
          <h3 className="text-lg font-semibold text-white">Duration</h3>
        </div>
        <div className="flex gap-3">
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
      <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/30 p-4 shadow-sm backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2">
          <span className="bg-primary-yellow/20 text-primary-yellow inline-flex h-8 w-8 items-center justify-center rounded-full">
            {/* Rating Icon */}
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
                d="M12 17.25l6.16 3.24-1.18-6.88 5-4.87-6.91-1-3.07-6.22-3.07 6.22-6.91 1 5 4.87-1.18 6.88L12 17.25z"
              />
            </svg>
          </span>
          <h3 className="text-lg font-semibold text-white">Rating</h3>
        </div>
        <div className="flex gap-3">
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
      <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/30 p-4 shadow-sm backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2">
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
                d="M8 7V3m8 4V3m-9 8h10m-9 8h10m-9-4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <h3 className="text-lg font-semibold text-white">Start Date</h3>
        </div>
        <div className="flex flex-col gap-3">
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
