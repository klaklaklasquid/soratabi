import { useNavigate } from "react-router-dom";

function NavigateBackPage() {
  const navigate = useNavigate();

  return (
    <svg
      onClick={() => navigate(-1)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="fixed top-5 left-5 size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}

export default NavigateBackPage;
