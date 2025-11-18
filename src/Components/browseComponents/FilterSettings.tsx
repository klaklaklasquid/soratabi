import { useNavigate } from "react-router-dom";
import InputButton from "../InputButton";
import data from "../../static/testData.json";

function FilterSettings({ notPage }: FilterSettingsProps) {
  const navigate = useNavigate();

  const minPrice = Math.min(
    ...data.tours.map((tour) => tour.price),
    ...data.cruises.map((cruise) => cruise.price),
  );

  const maxPrice = Math.max(
    ...data.tours.map((tour) => tour.price),
    ...data.cruises.map((cruise) => cruise.price),
  );

  const minDuration = Math.min(
    ...data.tours.map((tour) => tour.duration),
    ...data.cruises.map((cruise) => cruise.duration),
  );

  const maxDuration = Math.max(
    ...data.tours.map((tour) => tour.duration),
    ...data.cruises.map((cruise) => cruise.duration),
  );

  const minRatingsAverage = Math.floor(
    Math.min(
      ...data.tours.map((tour) => tour.ratingsAverage),
      ...data.cruises.map((cruise) => cruise.ratingsAverage),
    ),
  );

  const maxRatingsAverage = Math.ceil(
    Math.max(
      ...data.tours.map((tour) => tour.ratingsAverage),
      ...data.cruises.map((cruise) => cruise.ratingsAverage),
    ),
  );

  return (
    <section className="flex flex-col gap-5 px-5">
      {!notPage && (
        <svg
          onClick={() => navigate(-1)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="fixed top-5 left-5 size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      )}

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl">Price</h3>
        <div className="flex gap-5">
          <InputButton
            type="number"
            placeholder={`min ${minPrice}`}
            min={minPrice}
            max={maxPrice - 1}
          />
          <InputButton
            type="number"
            placeholder={`max ${maxPrice}`}
            min={minPrice + 1}
            max={maxPrice}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl">Duration</h3>
        <div className="flex gap-5">
          <InputButton
            type="number"
            placeholder={`min ${minDuration}`}
            min={minDuration}
            max={maxDuration - 1}
          />
          <InputButton
            type="number"
            placeholder={`max ${maxDuration}`}
            min={maxDuration + 1}
            max={maxDuration}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl">Rating</h3>
        <div className="flex gap-5">
          <InputButton
            type="number"
            placeholder={`min ${minRatingsAverage}`}
            min={minRatingsAverage}
            max={maxRatingsAverage - 1}
          />
          <InputButton
            type="number"
            placeholder={`max ${maxRatingsAverage}`}
            min={maxRatingsAverage + 1}
            max={maxRatingsAverage}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl">Start Date</h3>
        <div className="flex gap-5">
          <InputButton type="date" />
          <InputButton type="date" />
        </div>
      </div>
    </section>
  );
}

interface FilterSettingsProps {
  notPage?: boolean;
}

export default FilterSettings;
