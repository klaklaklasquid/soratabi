import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";

function ReviewEmpty() {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-3xl bg-white/30 p-8 backdrop-blur-md">
      <FontAwesomeIcon
        icon={faCommentSlash}
        className="text-primary-blue/40"
        size="3x"
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-primary-blue text-xl font-bold">No Reviews Yet</h3>
        <p className="text-center text-sm text-gray-600">
          Be the first to share your experience on this tour!
        </p>
      </div>
    </div>
  );
}

export default ReviewEmpty;
