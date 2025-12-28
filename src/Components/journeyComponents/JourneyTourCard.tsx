import { Link } from "react-router-dom";
import { capitalizeFirst } from "@/Utils/textAlter";

function JourneyTourCard({ data, status }: JourneyTourCardProps) {
  const formattedDate = new Date(
    data.bookedStartDate.startDate,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const statusConfig = {
    upcoming: {
      badge: "Upcoming",
      badgeColor: "bg-primary-yellow/80",
      buttonText: "View Full Details",
      buttonColor:
        "bg-secondary-blue hover:border-tertiary-blue hover:bg-primary-blue",
      buttonLink: `/tour/${data.type}/${data.id}`,
    },
    completed: {
      badge: "Completed",
      badgeColor: "bg-green-500/80",
      buttonText: "Write a Review",
      buttonColor:
        "bg-primary-yellow hover:border-primary-yellow hover:bg-primary-yellow/80",
      buttonLink: `/review/${data.id}`,
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className="bg-primary-blue/10 border-secondary-blue relative flex h-[400px] w-full flex-col justify-end overflow-hidden rounded-3xl border bg-cover bg-center bg-no-repeat shadow-xl transition-transform duration-300 hover:scale-[1.025] hover:shadow-2xl"
      style={{ backgroundImage: `url(${data.coverImage})` }}
    >
      {/* Type badge */}
      <span className="bg-secondary-blue/80 absolute top-4 right-4 z-20 rounded-full border border-white/20 px-5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
        {capitalizeFirst(data.type)}
      </span>

      {/* Status badge */}
      <span
        className={`${config.badgeColor} absolute top-4 left-4 z-20 rounded-full border border-white/20 px-5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md`}
      >
        {config.badge}
      </span>

      {/* Glassy info panel */}
      <div className="relative z-10 m-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
          {data.name}
        </h2>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white shadow backdrop-blur-sm">
            📅 {formattedDate}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white shadow backdrop-blur-sm">
            {data.duration} Days
          </span>
        </div>

        <p className="line-clamp-2 min-h-12 text-base font-medium text-gray-100">
          {data.summary}
        </p>

        <Link
          className={`${config.buttonColor} group mt-2 w-full rounded-full border border-white/20 px-6 py-2 text-center font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
          to={config.buttonLink}
        >
          {config.buttonText}
        </Link>
      </div>

      {/* Overlay for glassy blue tint */}
      <div className="from-primary-blue/60 via-primary-blue/10 pointer-events-none absolute inset-0 z-0 bg-linear-to-t to-transparent" />
    </div>
  );
}

interface JourneyTourCardProps {
  data: JourneyResponse;
  status: "upcoming" | "completed";
}

export default JourneyTourCard;
