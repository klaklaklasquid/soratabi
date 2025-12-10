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

function StartDates({ date, maxCustomers }: StartDatesProps) {
  const remainingSlots = maxCustomers - date.currentCustomers;
  const slotPercent = Math.max(0, Math.min(1, remainingSlots / maxCustomers));
  let slotBarColor = "bg-primary-blue/80";
  let slotTextColor = "text-primary-blue";
  let slotFillColor = "bg-secondary-blue/80";
  let cardBg = "bg-primary-blue/10";
  if (slotPercent < 0.35) {
    slotBarColor = "bg-tertiary-red/20 animate-pulse";
    slotTextColor = "text-tertiary-red";
    slotFillColor = "bg-tertiary-red/80";
    cardBg = "bg-tertiary-red/10";
  } else if (slotPercent < 0.65) {
    slotBarColor = "bg-primary-yellow/20";
    slotTextColor = "text-primary-yellow";
    slotFillColor = "bg-primary-yellow/80";
    cardBg = "bg-primary-yellow/10";
  }

  return (
    <Card
      className={`flex w-full flex-col gap-0 rounded-3xl border-none ${cardBg} p-0 shadow-2xl backdrop-blur-xl`}
    >
      <CardHeader className="flex flex-col items-center gap-2 px-8 pt-8">
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="text-primary-blue mb-2 text-3xl"
        />
        <CardTitle className="text-primary-blue text-3xl font-extrabold tracking-wide drop-shadow-lg">
          {date.startDate}
        </CardTitle>
        <CardDescription className="text-base text-gray-500">
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
            className="text-primary-blue text-xl"
          />
          <span className="text-base text-white">Max: {maxCustomers}</span>
          {remainingSlots > 0 && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-primary-green text-xl"
              title="Available"
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button
          className="bg-primary-blue/80 w-2/3 rounded-full py-3 text-lg font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          style="primary"
          disabled={remainingSlots <= 0}
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
