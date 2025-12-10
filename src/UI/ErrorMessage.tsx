import { Bug } from "lucide-react";

const ErrorMessage = ({ message }: { message?: string }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center text-center text-blue-400">
    <Bug className="mb-4 h-16 w-16 opacity-40" />
    <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
    <p className="max-w-xs">
      {message || "An unexpected error occurred. Please try again later."}
    </p>
  </div>
);

export default ErrorMessage;
