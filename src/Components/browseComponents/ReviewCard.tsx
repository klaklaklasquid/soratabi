import { Card } from "@/Components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";

function ReviewCard() {
  return (
    <Card className="flex min-w-80 flex-col gap-5 rounded-2xl border-none bg-white/40 p-6 text-base shadow-lg backdrop-blur-md sm:text-lg">
      <div className="mb-2 grid grid-cols-8 items-center">
        {/* temp circle for image */}
        <div className="bg-tertiary-blue col-start-1 h-8 w-8 rounded-full"></div>
        <h3 className="text-primary-blue col-span-5 col-start-2 text-base font-semibold">
          9 Sept 2001
        </h3>
        <h3 className="text-primary-yellow col-start-7 text-base font-bold">
          4.5
        </h3>
        <FontAwesomeIcon
          icon={fullStar}
          className="text-star text-primary-yellow col-start-8"
          size="lg"
        />
      </div>
      <h3 className="font-medium text-gray-800">
        I had a blast on this tour, highly recommend!
      </h3>
    </Card>
  );
}

export default ReviewCard;
