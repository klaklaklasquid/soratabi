import { OrbitProgress } from "react-loading-indicators";

function Loading() {
  return (
    <div className="flex w-full justify-center self-center">
      <OrbitProgress color={["#007799", "#009ecc", "#00c6ff", "#33d1ff"]} />
    </div>
  );
}

export default Loading;
