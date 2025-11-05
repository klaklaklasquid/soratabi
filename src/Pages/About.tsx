import { Canvas } from "@react-three/fiber";
import AboutText from "../3DComponents/AboutText";
import aboutContent from "../static/aboutContent";
import { Scroll, ScrollControls } from "@react-three/drei";
import Button from "../Components/Button";
import Footer from "../UI/Footer";

function About() {
  return (
    <>
      <section className={`grid h-svh grid-rows-[auto_90svh_auto_auto]`}>
        <h2 className="mt-6 mb-6 justify-self-center">WHY SORATABI</h2>

        <div className="row-start-2 h-full">
          <Canvas camera={{ fov: 60, position: [0, 0, 2] }}>
            <ambientLight intensity={1.5} />
            <ScrollControls pages={1} damping={0.2}>
              <Scroll>
                {aboutContent.map((item) => (
                  <AboutText
                    key={item.number}
                    title={item.title}
                    text={item.text}
                    number={item.number}
                  />
                ))}
              </Scroll>
            </ScrollControls>
          </Canvas>
        </div>

        <h2 className="mt-4 w-1/2 justify-self-center text-center">
          WHAT ARE YOU WAITING FOR BOOK NOW YOUR TRIP
        </h2>
        <div className="my-4 flex flex-col items-center justify-center gap-3 lg:flex-row">
          <Button style="primary">Browse Destinations</Button>
          <Button style="secondary">Your Journey</Button>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default About;
