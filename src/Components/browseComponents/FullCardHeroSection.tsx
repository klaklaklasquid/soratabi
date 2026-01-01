import RatingStars from "./RatingsStars";
import TextWithToggle from "./TextWithToggle";

function FullCardHeroSection({ stats, data }: FullCardHeroSectionProps) {
  return (
    <div className="relative flex min-h-80 flex-col gap-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md md:flex-row">
      {/* Info Panel Left */}
      <div className="z-10 flex flex-col gap-2 px-6 py-8 md:w-1/2">
        <div className="mb-2 flex items-center justify-between">
          <RatingStars
            rating={stats ? stats.averageRating : data.ratingsAverage}
          />
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-white shadow-lg backdrop-blur-sm">
            {stats ? stats.totalReviews : data.ratingsQuantity} reviews
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">
          {data.name}
        </h2>
        <h4 className="text-lg font-medium text-gray-200">{data.summary}</h4>
        <div className="my-2 flex gap-4">
          <span className="bg-primary-yellow/80 text-primary-blue rounded-full border border-white/20 px-4 py-1 text-lg font-bold shadow-lg backdrop-blur-sm">
            € {data.price}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-lg font-semibold text-white shadow-lg backdrop-blur-sm">
            {data.duration}-Day
          </span>
        </div>
        <TextWithToggle text={data.description} />
      </div>
      {/* Image Right */}
      <div
        className="flex min-h-[220px] w-full items-end justify-end md:min-h-8 md:w-1/2"
        style={{
          backgroundImage: `url(${data.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 15%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute right-4 bottom-4 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
          {data.tags.map((tag) => tag.tag).join(", ")}
        </div>
      </div>
    </div>
  );
}

interface FullCardHeroSectionProps {
  stats: TourStats | undefined;
  data: ToursData;
}

export default FullCardHeroSection;
