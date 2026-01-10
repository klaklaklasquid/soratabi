import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";

function StartDatesEmpty() {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-md">
      <FontAwesomeIcon
        icon={faCalendarXmark}
        className="text-white/40 drop-shadow-lg"
        size="3x"
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-xl font-bold text-white drop-shadow-lg">
          No Upcoming Dates
        </h3>
        <p className="text-center text-sm text-gray-300">
          There are currently no future tours scheduled. Check back later for
          new dates!
        </p>
      </div>
    </div>
  );
}

export default StartDatesEmpty;
