import { Canvas } from "@react-three/fiber";
import Globe from "../3DComponents/Globe";
import Plane from "../3DComponents/Plane";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../UI/Loading";
import BlurSpot from "../UI/BlurSpot";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative flex h-[calc(100vh-4rem)] flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-12 lg:py-12">
        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center lg:ml-[5%]">
          {/* Main Hero Text */}
          <div className="animate-slide-up mb-6 max-w-4xl sm:mb-6">
            <h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="via-tertiary-blue bg-linear-to-r from-white to-white bg-clip-text text-transparent">
                DISCOVER
              </span>
              <br />
              <span className="text-white">A NEW WORLD</span>
              <br />
              <span className="via-tertiary-blue block bg-linear-to-r from-white to-white bg-clip-text text-transparent">
                OF TRAVEL
              </span>
            </h1>
            <p className="max-w-xl text-sm text-gray-300 sm:text-base md:text-lg lg:text-xl">
              Embark on extraordinary journeys across the globe. From cultural
              tours to luxury cruises, your next adventure awaits.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-slide-up-delayed mb-6 flex flex-wrap justify-center gap-3 sm:mb-6 sm:justify-start sm:gap-4">
            <Button
              style="primary"
              onClick={() => navigate("/browse-destination")}
            >
              Explore Destinations
            </Button>
            <Button style="secondary" onClick={() => navigate("/my-journey")}>
              Your Journey
            </Button>
          </div>

          {/* Stats Section - Desktop only */}
          <div className="animate-fade-in-delayed hidden grid-cols-4 gap-3 md:grid lg:max-w-3xl">
            <div className="hover:border-tertiary-blue/30 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="text-tertiary-blue mb-1 text-2xl font-bold lg:text-3xl">
                150+
              </div>
              <div className="text-xs text-gray-400 lg:text-sm">
                Destinations
              </div>
            </div>
            <div className="hover:border-tertiary-blue/30 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="text-primary-yellow mb-1 text-2xl font-bold lg:text-3xl">
                50K+
              </div>
              <div className="text-xs text-gray-400 lg:text-sm">
                Happy Travelers
              </div>
            </div>
            <div className="hover:border-tertiary-blue/30 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="mb-1 text-2xl font-bold text-white lg:text-3xl">
                4.9
              </div>
              <div className="text-xs text-gray-400 lg:text-sm">
                Average Rating
              </div>
            </div>
            <div className="hover:border-tertiary-blue/30 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="mb-1 text-2xl font-bold text-white lg:text-3xl">
                24/7
              </div>
              <div className="text-xs text-gray-400 lg:text-sm">Support</div>
            </div>
          </div>
        </div>

        {/* Globe Canvas - Floating on the right */}
        <div className="absolute top-1/2 right-0 flex h-[600px] w-[600px] -translate-y-1/2 opacity-60 md:right-20 xl:h-[800px] xl:w-[800px]">
          <Suspense fallback={<Loading />}>
            <Canvas camera={{ fov: 60, position: [0, 0, 2] }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 5, 10]} intensity={0.5} />
              <Globe />
              <Plane />
            </Canvas>
          </Suspense>
        </div>

        {/* Decorative Elements */}
        <BlurSpot
          color="bg-tertiary-blue/20"
          className="top-1/4 left-0 h-48 w-48 sm:h-72 sm:w-72"
          blur="blur-[80px] sm:blur-[100px]"
        />
        <BlurSpot
          color="bg-secondary-blue/20"
          className="right-0 bottom-1/4 h-64 w-64 sm:right-1/4 sm:h-96 sm:w-96"
          blur="blur-[100px] sm:blur-[120px]"
        />
      </section>

      {/* Stats Section - Mobile only (below fold) */}
      <section className="relative px-4 py-8 md:hidden">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            Why Choose Soratabi?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="hover:border-tertiary-blue/30 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="text-tertiary-blue mb-1 text-2xl font-bold">
                150+
              </div>
              <div className="text-xs text-gray-400">Destinations</div>
            </div>
            <div className="hover:border-tertiary-blue/30 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="text-primary-yellow mb-1 text-2xl font-bold">
                50K+
              </div>
              <div className="text-xs text-gray-400">Happy Travelers</div>
            </div>
            <div className="hover:border-tertiary-blue/30 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="mb-1 text-2xl font-bold text-white">4.9</div>
              <div className="text-xs text-gray-400">Average Rating</div>
            </div>
            <div className="hover:border-tertiary-blue/30 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="mb-1 text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
