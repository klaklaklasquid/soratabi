import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useModels } from "../Hooks/useModels";

function Star() {
  const { star } = useModels();
  const starRef = useRef<THREE.Object3D>(null!);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    starRef.current.rotation.y += delta * 0.5;
    starRef.current.rotation.z = Math.sin(time) / 1.5;
  });

  return <primitive ref={starRef} object={star.scene} />;
}

export default Star;
