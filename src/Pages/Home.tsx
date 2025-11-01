import { Canvas } from "@react-three/fiber";
import Globe from "../3DComponents/Globe";

function Home() {
  return (
    <div>
      <h2 className="text-2xl">SORATABI</h2>
      <div className="mt-12 text-4xl sm:text-5xl md:text-6xl">
        <h1>DISCOVER A NEW</h1>
        <h1>WORLD OF</h1>
        <h1>TRAVEL</h1>
      </div>

      <div className="w-50 h-50 absolute right-5 sm:w-80 sm:h-80 sm:right-20 md:w-100 md:h-100 md:right-30 lg:right-60">
        <Canvas camera={{ fov: 60, position: [0, 0, 2] }}>
          <ambientLight intensity={1.5} />
          <Globe />
        </Canvas>
      </div>
    </div>
  );
}

export default Home;
