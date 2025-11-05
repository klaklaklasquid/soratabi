function RoutePathSVG() {
  return (
    <svg
      className="pointer-events-none absolute top-0 left-1/2 h-full w-screen -translate-x-1/2"
      viewBox="0 0 400 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M200 0
           C-500 150, 800 300, 200 450
           C-500 600, 800 750, 200 900
           C-500 1050, 800 1200, 200 1350"
        stroke="white"
        strokeDasharray="12 12"
        strokeWidth="5"
        opacity="0.4"
      />
    </svg>
  );
}

export default RoutePathSVG;
