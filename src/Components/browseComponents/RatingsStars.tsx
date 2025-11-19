import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fullStar,
  faStarHalfStroke as halfStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i) {
          return (
            <FontAwesomeIcon
              key={i}
              icon={fullStar}
              className="text-star"
              size="xl"
            />
          );
        }

        if (rating >= i - 0.5) {
          return (
            <FontAwesomeIcon
              key={i}
              icon={halfStar}
              className="text-star"
              size="xl"
            />
          );
        }

        return (
          <FontAwesomeIcon
            key={i}
            icon={outlineStar}
            className="text-star"
            size="xl"
          />
        );
      })}
    </div>
  );
}

export default RatingStars;
