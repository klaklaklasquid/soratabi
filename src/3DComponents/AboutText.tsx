import { Canvas } from "@react-three/fiber";
import Globe from "./Globe";
import PlaneForText from "./PlaneForText";
import Paint from "./Paint";
import Star from "./Star";
import Rainbow from "./Rainbow";
import { Suspense } from "react";
import Loading from "../UI/Loading";

function AboutText(props: AboutTextProps) {
  // Responsive chat bubble: row on desktop, column on mobile
  const isLeft = props.align === "left";
  return (
    <div
      className={`relative z-10 mx-auto flex max-w-[80vw] flex-col items-center gap-2 md:max-w-[70vw] lg:max-w-[32vw] lg:flex-row lg:items-end lg:gap-4 ${isLeft ? "lg:justify-start" : "lg:flex-row-reverse lg:justify-end"}`}
    >
      {/* 3D Model above bubble on mobile, left/right on desktop */}
      <div className="relative mb-2 flex h-24 w-24 lg:mb-0 lg:h-40 lg:w-40">
        <Suspense fallback={<Loading />}>
          <Canvas camera={{ fov: 60, position: [0, 0, 2] }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 5, 10]} intensity={0.7} />
            <ModelRenderer model={props.model} />
          </Canvas>
        </Suspense>
        {/* Glow behind model */}
        <div
          className={`absolute inset-0 -z-10 rounded-full ${isLeft ? "bg-tertiary-blue/20" : "bg-primary-yellow/20"} blur-2xl`}
        />
      </div>
      {/* Chat bubble */}
      <div
        className={`relative flex flex-col gap-2 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-md transition-all duration-300 md:px-6 md:py-4 ${isLeft ? "bg-primary-blue/90 message-box-left" : "bg-secondary-blue/90 message-box-right"}`}
      >
        <h3 className="text-base font-semibold text-white md:text-lg">
          {props.title}
        </h3>
        <p className="text-sm text-gray-200 md:text-base">{props.text}</p>
      </div>
    </div>
  );
}

interface AboutTextProps {
  title: string;
  text: string;
  number: number;
  model: string;
  align: "left" | "right";
}

function ModelRenderer({ model }: { model: string }) {
  switch (model) {
    case "globe":
      return <Globe />;

    case "paint":
      return <Paint />;

    case "star":
      return <Star />;

    case "plane":
      return <PlaneForText />;

    case "rainbow":
      return <Rainbow />;

    default:
      return null;
  }
}

export default AboutText;
