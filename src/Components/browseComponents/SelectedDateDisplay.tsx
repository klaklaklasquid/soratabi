import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/Components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { getSlotStyling } from "@/Utils/getSlotStyling";

interface SelectedDateDisplayProps {
  date: StartDatesData;
  maxCustomers: number;
  tourPrice: number;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

function SelectedDateDisplay({
  date,
  maxCustomers,
  tourPrice,
  onSubmit,
  isSubmitting = false,
}: SelectedDateDisplayProps) {
  const remainingSlots = maxCustomers - date.currentCustomers;
  const slotPercent = Math.max(0, Math.min(1, remainingSlots / maxCustomers));

  const {
    slotBarColor,
    slotTextColor,
    slotFillColor,
    cardBg,
    statusIcon,
    statusIconColor,
    statusMessage,
  } = getSlotStyling(remainingSlots, maxCustomers, "display");

  return (
    <Card
      className={`flex w-full flex-col gap-0 rounded-3xl border-none ${cardBg} p-0 shadow-2xl backdrop-blur-xl`}
    >
      <CardHeader className="flex flex-col items-center gap-2 px-8 pt-8">
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="text-offwhite mb-2 text-3xl"
        />
        <CardTitle className="text-offwhite text-3xl font-extrabold tracking-wide drop-shadow-lg">
          {date.startDate}
        </CardTitle>
        <CardDescription className="text-base text-gray-500">
          Your Selected Tour Date
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
            className="text-offwhite text-xl"
          />
          <span className="text-base text-white">Max: {maxCustomers}</span>
          <FontAwesomeIcon
            icon={statusIcon}
            className={`text-xl ${statusIconColor}`}
            title={statusMessage}
          />
        </div>

        {/* Divider */}
        <div className="bg-primary-blue/20 my-4 h-px w-full" />

        {/* Price and Purchase */}
        <div className="flex w-full flex-col gap-6">
          {/* Price Display */}
          <div className="bg-secondary-blue/30 flex flex-col gap-3 rounded-3xl p-4 shadow-lg sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-offwhite text-base font-bold tracking-wide uppercase sm:text-lg">
                Ticket Price
              </span>
              <span className="text-offwhite text-xl font-black sm:text-2xl">
                € {tourPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={onSubmit}
            disabled={isSubmitting || remainingSlots <= 0}
            className="bg-primary-blue text-offwhite rounded-full py-3 text-base font-bold shadow-lg transition-all duration-200 hover:scale-101 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:py-4 sm:text-lg"
          >
            {isSubmitting
              ? "Processing..."
              : remainingSlots <= 0
                ? "Sold Out"
                : `Complete Purchase`}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SelectedDateDisplay;
