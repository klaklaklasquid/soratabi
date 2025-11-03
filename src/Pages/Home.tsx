import { Canvas } from "@react-three/fiber";
import Globe from "../3DComponents/Globe";
import Plane from "../3DComponents/Plane";
import Button from "../Components/Button";

function Home() {
  return (
    <section className="grid grid-rows-8 grid-cols-2 h-full">
      <h2 className="text-2xl row-span-1">SORATABI</h2>
      <div className="text-4xl sm:text-5xl md:text-6xl col-start-1 row-span-2">
        <h1>DISCOVER A NEW</h1>
        <h1>WORLD OF</h1>
        <h1>TRAVEL</h1>
      </div>

      <div className="grid place-items-center row-start-3 col-start-2">
        <div className=" w-50 h-50 sm:w-80 sm:h-80 sm:right-20 md:w-100 md:h-100 md:right-30 lg:right-60">
          <Canvas camera={{ fov: 60, position: [0, 0, 2] }}>
            <ambientLight intensity={1.5} />
            <Globe />
            <Plane />
          </Canvas>
        </div>
      </div>

      <div className="grid row-start-7 col-span-2 place-items-center gap-4">
        <Button style="primary">Browse Destinations</Button>
        <Button style="secondary">Your Journey</Button>
      </div>
    </section>
  );
}

export default Home;
