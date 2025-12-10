import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useModels } from "../Hooks/useModels";

function Rainbow() {
  const { rainbow } = useModels();
  const rainbowRef = useRef<THREE.Object3D>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    rainbowRef.current.rotation.y = Math.sin(time);
  });

  return (
    <primitive
      ref={rainbowRef}
      object={rainbow.scene}
      rotation={[0, 0, 0.15]}
      scale={0.75}
    />
  );
}

export default Rainbow;
