import { Canvas } from "@react-three/fiber";
import Globe from "../3DComponents/Globe";

function Home() {
  return (
    <div>
      <h2 className="text-2xl">SORATABI</h2>
      <div className="mt-12 text-4xl">
        <h1>DISCOVER A NEW</h1>
        <h1>WORLD OF</h1>
        <h1>TRAVEL</h1>

        <div className="w-50 h-50 absolute right-5 md:w-60 md:h-60 md:right-10">
          <Canvas camera={{ fov: 60, position: [0, 0, 2] }}>
            <ambientLight intensity={1.5} />
            <Globe />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default Home;
