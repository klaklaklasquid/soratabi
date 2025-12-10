import { AlertTriangle } from "lucide-react";

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center text-center text-blue-400">
    <AlertTriangle className="mb-4 h-20 w-20 opacity-40" />
    <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
    <p className="max-w-xs">
      Sorry, the page you are looking for does not exist or an error occurred.
    </p>
  </div>
);

export default NotFound;
