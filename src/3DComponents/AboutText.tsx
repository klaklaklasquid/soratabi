import { Canvas } from "@react-three/fiber";
import Globe from "./Globe";
import PlaneForText from "./PlaneForText";
import Paint from "./Paint";
import Star from "./Star";
import Rainbow from "./Rainbow";

function AboutText(props: AboutTextProps) {
  const side = props.number % 2 === 0;

  return (
    <div
      className={`bg-primary-blue relative flex h-[300px] w-[300px] flex-col gap-4 rounded-2xl p-5 ${side ? "message-box-right" : "message-box-left"} `}
    >
      <h3 className="text-xl">{props.title}</h3>
      <p>{props.text}</p>

      <div
        className={`absolute -top-16 h-24 w-24 ${side ? "-left-1/10" : "-right-1/10"}`}
      >
        <Canvas camera={{ fov: 60, position: [0, 0, 2] }}>
          <ambientLight intensity={2} />
          <ModelRenderer model={props.model} />
        </Canvas>
      </div>
    </div>
  );
}

interface AboutTextProps {
  title: string;
  text: string;
  number: number;
  model: string;
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
