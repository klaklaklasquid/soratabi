import Button from "../Button";

function StartDates({ date, maxCustomers }: StartDatesProps) {
  const remainingSlots = maxCustomers - date.currentCustomers;

  return (
    <div className="bg-primary-blue-50 it flex flex-col justify-center gap-3 rounded-xl p-5 text-xl">
      <h3>Start date</h3>
      <h3>{date.startDate}</h3>
      <div className="flex items-center gap-5">
        <h3
          className={`rounded-[9999px] px-8 py-2 font-bold ${remainingSlots > maxCustomers * 0.65 ? "bg-tertiary-blue" : remainingSlots > maxCustomers * 0.35 ? "bg-primary-yellow" : "bg-tertiary-red"}`}
        >
          {remainingSlots}
        </h3>
        <h3>slots remaining</h3>
      </div>
      <Button className="mt-5 w-1/2" style="primary">
        Book Tour
      </Button>
    </div>
  );
}

interface StartDatesProps {
  date: StartDatesData;
  maxCustomers: number;
}

export default StartDates;
