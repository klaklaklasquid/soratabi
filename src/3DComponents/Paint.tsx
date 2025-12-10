import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useModels } from "../Hooks/useModels";

function Paint() {
  const { paint } = useModels();
  const paintRef = useRef<THREE.Object3D>(null!);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    paintRef.current.rotation.y += delta * 0.5;
    paintRef.current.rotation.z = Math.sin(time) / 1.5;
  });

  return (
    <primitive
      ref={paintRef}
      object={paint.scene}
      rotation={[Math.PI / 2, 0, 0]}
    ></primitive>
  );
}

export default Paint;
