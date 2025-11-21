import InputButton from "../InputButton";
import data from "../../static/testData.json";
import { useFilter } from "../../Hooks/useFilter";
import Button from "../Button";
import NavigateBackPage from "../NavigateBackPage";

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

  const minPricePlaceholder = Math.min(
    ...data.tours.map((tour) => tour.price),
    ...data.cruises.map((cruise) => cruise.price),
  );

  const maxPricePlaceholder = Math.max(
    ...data.tours.map((tour) => tour.price),
    ...data.cruises.map((cruise) => cruise.price),
  );

  const minDurationPlaceholder = Math.min(
    ...data.tours.map((tour) => tour.duration),
    ...data.cruises.map((cruise) => cruise.duration),
  );

  const maxDurationPlaceholder = Math.max(
    ...data.tours.map((tour) => tour.duration),
    ...data.cruises.map((cruise) => cruise.duration),
  );

  const minRatingsAveragePlaceholder = Math.floor(
    Math.min(
      ...data.tours.map((tour) => tour.ratingsAverage),
      ...data.cruises.map((cruise) => cruise.ratingsAverage),
    ),
  );

  const maxRatingsAveragePlaceholder = Math.ceil(
    Math.max(
      ...data.tours.map((tour) => tour.ratingsAverage),
      ...data.cruises.map((cruise) => cruise.ratingsAverage),
    ),
  );

  return (
    <section className={`flex flex-col gap-5 ${!notPage && "px-10"}`}>
      {!notPage && <NavigateBackPage />}

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl">Price</h3>
        <div className="flex gap-5">
          <InputButton<number | undefined>
            type="number"
            placeholder={`min ${minPricePlaceholder}`}
            min={minPricePlaceholder}
            max={maxPricePlaceholder - 1}
            state={minPrice}
            setState={setMinPrice}
          />
          <InputButton<number | undefined>
            type="number"
            placeholder={`max ${maxPricePlaceholder}`}
            min={minPricePlaceholder + 1}
            max={maxPricePlaceholder}
            state={maxPrice}
            setState={setMaxPrice}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl">Duration</h3>
        <div className="flex gap-5">
          <InputButton<number | undefined>
            type="number"
            placeholder={`min ${minDurationPlaceholder}`}
            min={minDurationPlaceholder}
            max={maxDurationPlaceholder - 1}
            state={minDuration}
            setState={setMinDuration}
          />
          <InputButton<number | undefined>
            type="number"
            placeholder={`max ${maxDurationPlaceholder}`}
            min={maxDurationPlaceholder + 1}
            max={maxDurationPlaceholder}
            state={maxDuration}
            setState={setMaxDuration}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl">Rating</h3>
        <div className="flex gap-5">
          <InputButton<number | undefined>
            type="number"
            placeholder={`min ${minRatingsAveragePlaceholder}`}
            min={minRatingsAveragePlaceholder}
            max={maxRatingsAveragePlaceholder - 1}
            state={minRatingAverage}
            setState={setMinRatingAverage}
          />
          <InputButton<number | undefined>
            type="number"
            placeholder={`max ${maxRatingsAveragePlaceholder}`}
            min={maxRatingsAveragePlaceholder + 1}
            max={maxRatingsAveragePlaceholder}
            state={maxRatingAverage}
            setState={setMaxRatingAverage}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl">Start Date</h3>
        <div className="flex flex-col gap-5">
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
