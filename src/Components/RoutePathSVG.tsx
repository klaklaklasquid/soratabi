function RoutePathSVG() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 -150 400 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M200 0
           C180 100, 440 200, 200 300 
           C180 400, -220 500, 200 600 
           C180 700, 220 800, 200 900"
        stroke="white"
        strokeDasharray="12 12"
        strokeWidth="5"
        opacity="0.4"
      />
    </svg>
  );
}

export default RoutePathSVG;
