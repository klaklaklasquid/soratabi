import { Canvas } from "@react-three/fiber";
import Globe from "../3DComponents/Globe";
import Plane from "../3DComponents/Plane";
import Button from "../Components/Button";
import Footer from "../UI/Footer";

function Home() {
  return (
    <>
      <section className="grid h-full grid-cols-2 grid-rows-8 pt-5 pl-5">
        <h2 className="row-span-1 text-2xl">SORATABI</h2>
        <div className="col-span-2 col-start-1 row-span-2 row-start-2 text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[8rem]">
          <h1>DISCOVER A NEW</h1>
          <h1>WORLD OF</h1>
          <h1>TRAVEL</h1>
        </div>

        <div className="col-start-2 row-span-2 row-start-3 grid place-items-center sm:row-span-3 sm:row-start-3 lg:row-span-4 lg:row-start-3">
          <Canvas camera={{ fov: 60, position: [0, 0, 2] }}>
            <ambientLight intensity={1.5} />
            <Globe />
            <Plane />
          </Canvas>
        </div>

        <div className="col-span-2 row-start-7 flex flex-col items-center justify-center gap-4 lg:col-span-1 lg:row-start-6 lg:flex-row lg:justify-start xl:row-start-7">
          <Button style="primary">Browse Destinations</Button>
          <Button style="secondary">Your Journey</Button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
