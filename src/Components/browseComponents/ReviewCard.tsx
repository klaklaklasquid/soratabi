import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";

function ReviewCard() {
  return (
    // 🌟 KEY CHANGES: Added w-[90vw] (or a fixed width) and flex-shrink-0 🌟
    <div className="bg-primary-blue-50 flex w-[80vw] shrink-0 snap-center flex-col gap-5 rounded-2xl p-5 text-xl sm:w-96">
      <div className="grid grid-cols-8 place-items-center">
        {/* temp circel for image */}
        <div className="bg-tertiary-blue col-start-1 h-8 w-8 rounded-full"></div>

        <h3 className="col-span-5 col-start-2">9 Sept 2001</h3>

        <h3 className="col-start-7">4.5</h3>
        <FontAwesomeIcon
          icon={fullStar}
          className="text-star col-start-8"
          size="lg"
        />
      </div>

      <h3>I had a blast on this tour highly recommend</h3>
    </div>
  );
}

export default ReviewCard;
