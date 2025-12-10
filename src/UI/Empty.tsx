import { Plane } from "lucide-react";

const Empty = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center text-gray-400">
      <Plane className="mb-4 h-20 w-20 opacity-30" />
      <h2 className="mb-2 text-2xl font-semibold">Nothing to show here</h2>
      <p className="max-w-xs">
        There are currently no results or content to display on this page.
      </p>
    </div>
  );
};

export default Empty;
