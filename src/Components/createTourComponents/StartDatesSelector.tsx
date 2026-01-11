import { ErrorMessage } from "formik";

interface StartDatesSelectorProps {
  values: ToursRequestData;
  startDates: StartDatesData[];
  startDateSearch: string;
  setStartDateSearch: (value: string) => void;
  setFieldValue: (field: string, value: number[]) => void;
  onCreateNew: () => void;
}

function StartDatesSelector({
  values,
  startDates,
  startDateSearch,
  setStartDateSearch,
  setFieldValue,
  onCreateNew,
}: StartDatesSelectorProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-xl backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-lg font-semibold text-white">
          Start Dates
        </label>
        <button
          type="button"
          onClick={onCreateNew}
          className="rounded-lg bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30"
        >
          + Create New
        </button>
      </div>
      <input
        type="text"
        value={startDateSearch}
        onChange={(e) => setStartDateSearch(e.target.value)}
        placeholder="Search start dates..."
        className="mb-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
      />
      {startDateSearch && (
        <div className="mb-3 max-h-40 overflow-y-auto rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
          {startDates
            .filter((date) =>
              date.startDate
                .toLowerCase()
                .includes(startDateSearch.toLowerCase()),
            )
            .map((date) => (
              <div
                key={date.id}
                onClick={() => {
                  if (!values.startDateIds.includes(date.id)) {
                    setFieldValue("startDateIds", [
                      ...values.startDateIds,
                      date.id,
                    ]);
                  }
                  setStartDateSearch("");
                }}
                className="cursor-pointer px-4 py-2 text-white hover:bg-white/10"
              >
                {date.startDate}
              </div>
            ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {values.startDateIds.map((id) => {
          const date = startDates.find((d) => d.id === id);
          return (
            <span
              key={id}
              className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white backdrop-blur-sm"
            >
              {date?.startDate}
              <button
                type="button"
                onClick={() =>
                  setFieldValue(
                    "startDateIds",
                    values.startDateIds.filter((did) => did !== id),
                  )
                }
                className="text-lg text-white hover:text-red-300"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
      <ErrorMessage
        name="startDateIds"
        component="div"
        className="mt-2 text-sm text-red-400"
      />
    </div>
  );
}

export default StartDatesSelector;
