const BlurSpot = ({
  color,
  className = "",
  opacity = "opacity-50",
  blur = "blur-[80px]",
}: BlurSpotProps) => {
  return (
    <div
      className={`pointer-events-none absolute rounded-full ${color} ${opacity} ${blur} ${className}`}
      aria-hidden="true"
    />
  );
};

interface BlurSpotProps {
  color: string;
  className?: string;
  opacity?: string;
  blur?: string;
}

export default BlurSpot;
