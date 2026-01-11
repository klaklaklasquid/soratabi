import { ErrorMessage } from "formik";

interface LocationsSelectorProps {
  values: ToursRequestData;
  locations: LocationsData[];
  locationSearch: string;
  setLocationSearch: (value: string) => void;
  setFieldValue: (field: string, value: number[]) => void;
  onCreateNew: () => void;
}

function LocationsSelector({
  values,
  locations,
  locationSearch,
  setLocationSearch,
  setFieldValue,
  onCreateNew,
}: LocationsSelectorProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-xl backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-lg font-semibold text-white">
          Locations
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
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
        placeholder="Search locations..."
        className="mb-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
      />
      {locationSearch && (
        <div className="mb-3 max-h-40 overflow-y-auto rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
          {locations
            .filter((loc) =>
              loc.name.toLowerCase().includes(locationSearch.toLowerCase()),
            )
            .map((loc) => (
              <div
                key={loc.id}
                onClick={() => {
                  if (!values.locationIds.includes(loc.id)) {
                    setFieldValue("locationIds", [
                      ...values.locationIds,
                      loc.id,
                    ]);
                  }
                  setLocationSearch("");
                }}
                className="cursor-pointer px-4 py-2 text-white hover:bg-white/10"
              >
                {loc.name}
              </div>
            ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {values.locationIds.map((id) => {
          const loc = locations.find((l) => l.id === id);
          return (
            <span
              key={id}
              className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white backdrop-blur-sm"
            >
              {loc?.name}
              <button
                type="button"
                onClick={() =>
                  setFieldValue(
                    "locationIds",
                    values.locationIds.filter((lid) => lid !== id),
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
        name="locationIds"
        component="div"
        className="mt-2 text-sm text-red-400"
      />
    </div>
  );
}

export default LocationsSelector;
