import { Link } from "react-router-dom";
import { capitalizeFirst } from "../../Utils/textAlter";
import { useMemo } from "react";

function TourCard({ data, type }: TourCardProps) {
  const status = useMemo(() => {
    const dates = data.startDates;

    const allFull = dates.every(
      (date) => date.currentCustomers >= data.maxCustomers,
    );

    if (allFull) return "Currently Not Available";

    const anyLastSlots = dates.some(
      (date) => date.currentCustomers >= data.maxCustomers * 0.35,
    );

    return anyLastSlots ? "Last Slots" : "Available";
  }, [data.startDates, data.maxCustomers]);

  const statusClasses = {
    Available: "bg-secondary-blue",
    "Last Slots": "bg-primary-yellow",
    "Currently Not Available": "bg-tertiary-red",
  };
  return (
    <div
      className="bg-primary-blue/10 border-secondary-blue relative flex h-[400px] w-full flex-col justify-end overflow-hidden rounded-3xl border bg-contain bg-center bg-no-repeat shadow-xl transition-transform duration-300 hover:scale-[1.025] hover:shadow-2xl"
      style={{ backgroundImage: `url(${data.coverImage})` }}
    >
      {/* Glassy info panel */}
      <span className="bg-secondary-blue/80 absolute top-4 right-4 z-20 rounded-full border border-white/20 px-5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
        {capitalizeFirst(data.type)}
      </span>
      <div className="relative z-10 m-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">
            {data.name}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="border-primary-yellow/30 bg-primary-yellow/20 text-primary-yellow min-w-[100px] rounded-full border px-4 py-1 text-center text-lg font-bold shadow-lg backdrop-blur-sm">
            € {data.price}
          </span>
          <span className="min-w-[100px] rounded-full border border-white/20 bg-white/10 px-4 py-1 text-center text-lg font-medium text-white shadow backdrop-blur-sm">
            {data.duration}-Day {capitalizeFirst(data.type)}
          </span>
        </div>
        <p className="line-clamp-2 flex min-h-12 min-w-[200px] items-start text-base font-medium text-gray-100">
          {data.summary}
        </p>
        <div className="mt-2 flex w-full flex-col items-center justify-between gap-4 self-end lg:flex-row">
          <span
            className={`${statusClasses[status]} min-w-[120px] rounded-full px-6 py-2 text-center font-semibold text-white shadow-lg backdrop-blur-sm`}
          >
            {status}
          </span>
          <Link
            className="group bg-secondary-blue hover:border-tertiary-blue hover:bg-primary-blue min-w-[120px] rounded-full border border-white/20 px-6 py-2 text-center font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            to={`/tour/${type}/${data.id}`}
          >
            View Details
          </Link>
        </div>
      </div>
      {/* Overlay for glassy blue tint */}
      <div className="from-primary-blue/60 via-primary-blue/10 pointer-events-none absolute inset-0 z-0 bg-linear-to-t to-transparent" />
    </div>
  );
}

interface TourCardProps {
  data: ToursData;
  type: string;
}

export default TourCard;
