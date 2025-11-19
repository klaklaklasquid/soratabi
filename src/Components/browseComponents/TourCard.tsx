import { Link } from "react-router-dom";
import { capitalizeFirst } from "../../Utils/textAlter";

function TourCard({ data, type }: TourCardProps) {
  const lastSlots = data.maxCustomers * 0.9 < data.customers;

  function availabilty() {
    if (data.customers === data.maxCustomers) {
      return "Currently Not Available";
    } else if (lastSlots) {
      return "Last Slots";
    } else {
      return "Available";
    }
  }

  return (
    <div className="bg-primary-blue-50 flex h-full w-full flex-col gap-4 self-start justify-self-center rounded-2xl p-7">
      <div className="flex justify-between">
        <h2 className="max-w-2/3 text-2xl">{data.name}</h2>
        <h2 className="bg-secondary-blue self-start rounded-[9999px] px-6 py-2">
          {capitalizeFirst(data.type)}
        </h2>
      </div>
      <h1 className="text-4xl">€ {data.price}</h1>
      <h2 className="text-2xl">
        {data.duration}-Day {capitalizeFirst(data.type)}
      </h2>
      <h3 className="text-xl">{data.summary}</h3>
      <h2
        className={`${availabilty() === "Available" ? "bg-secondary-blue" : "bg-tertiary-red"} self-start rounded-[9999px] px-6 py-2`}
      >
        {availabilty()}
      </h2>
      <img
        className="h-1/2 object-contain"
        src={data.coverImage}
        alt="image of the place"
      />

      <Link
        className="bg-secondary-blue self-center justify-self-end rounded-[9999px] px-6 py-2"
        to={`/tour/${type}/${data.id}`}
      >
        Full Page
      </Link>
    </div>
  );
}

interface TourCardProps {
  data: ToursData;
  type: string;
}

export default TourCard;
