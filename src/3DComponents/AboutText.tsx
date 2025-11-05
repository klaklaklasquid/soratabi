import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

function AboutText(props: AboutTextProps) {
  const { viewport } = useThree();

  const x =
    props.number % 2 === 0 ? viewport.width / 2.5 : -viewport.width / 2.5;
  const spacing = viewport.height / 1.5;
  const y = viewport.height / 1.2 - props.number * spacing;

  return (
    <>
      <Html position={[x, y, 0]}>
        <div
          className={`flex h-[300px] w-[300px] flex-col gap-4 rounded-2xl bg-[rgba(255,255,255,0.2)] p-5 ${props.number % 2 === 0 ? "message-box-right -translate-x-full" : "message-box-left"} `}
        >
          <h3 className="text-xl">{props.title}</h3>
          <p>{props.text}</p>
        </div>
      </Html>
    </>
  );
}

interface AboutTextProps {
  title: string;
  text: string;
  number: number;
}

export default AboutText;
