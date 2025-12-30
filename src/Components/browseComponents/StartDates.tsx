import Button from "../Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/Components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUserFriends,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

function StartDates({ date, maxCustomers }: StartDatesProps) {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const remainingSlots = maxCustomers - date.currentCustomers;
  const slotPercent = Math.max(0, Math.min(1, remainingSlots / maxCustomers));
  let slotBarColor = "bg-white/20";
  let slotTextColor = "text-white";
  let slotFillColor = "bg-secondary-blue/80";
  let cardBorder = "border-white/10";

  //! FORCE YELLOW STATE FOR TESTING - COMMENT OUT WHEN DONE
  // if (true) {
  //   slotBarColor = "bg-primary-yellow/20";
  //   slotTextColor = "text-primary-yellow";
  //   slotFillColor = "bg-primary-yellow/80";
  //   cardBorder = "border-primary-yellow/40";
  // }

  //! FORCE RED STATE FOR TESTING - COMMENT OUT WHEN DONE
  // if (true) {
  //   slotBarColor = "bg-tertiary-red/20 animate-pulse";
  //   slotTextColor = "text-tertiary-red";
  //   slotFillColor = "bg-tertiary-red/80";
  //   cardBorder = "border-tertiary-red/40";
  // }

  if (slotPercent < 0.35) {
    slotBarColor = "bg-tertiary-red/20 animate-pulse";
    slotTextColor = "text-tertiary-red";
    slotFillColor = "bg-tertiary-red/80";
    cardBorder = "border-tertiary-red/40";
  } else if (slotPercent < 0.65) {
    slotBarColor = "bg-primary-yellow/20";
    slotTextColor = "text-primary-yellow";
    slotFillColor = "bg-primary-yellow/80";
    cardBorder = "border-primary-yellow/40";
  }

  function handleNavigation() {
    navigate(`/tour/${type}/${id}/date/${date.id}`);
  }

  return (
    <Card
      className={`flex w-full flex-col gap-0 rounded-3xl border ${cardBorder} bg-white/5 p-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
    >
      <CardHeader className="flex flex-col items-center gap-2 px-8 pt-8">
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="mb-2 text-3xl text-white drop-shadow-lg"
        />
        <CardTitle className="text-3xl font-extrabold tracking-wide text-white drop-shadow-lg">
          {date.startDate}
        </CardTitle>
        <CardDescription className="text-base font-semibold text-gray-300">
          Tour Start Date
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 px-8 py-6">
        <div className="flex w-full flex-col gap-2">
          <div
            className={`relative h-6 w-full rounded-full ${slotBarColor} shadow-inner`}
          >
            <div
              className={`absolute top-0 left-0 h-6 rounded-full ${slotFillColor} transition-all duration-500`}
              style={{ width: `${slotPercent * 100}%` }}
            />
            <span
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold ${slotTextColor}`}
            >
              {remainingSlots} slots left
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <FontAwesomeIcon
            icon={faUserFriends}
            className="text-xl text-white drop-shadow"
          />
          <span className="text-base font-semibold text-white">
            Max: {maxCustomers}
          </span>
          {remainingSlots > 0 && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-primary-green text-xl drop-shadow"
              title="Available"
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button
          className="w-2/3 rounded-full border border-white/20 bg-white/10 py-3 text-lg font-bold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          style="primary"
          disabled={remainingSlots <= 0}
          onClick={handleNavigation}
        >
          Book This Date
        </Button>
      </CardFooter>
    </Card>
  );
}

interface StartDatesProps {
  date: StartDatesData;
  maxCustomers: number;
}

export default StartDates;
