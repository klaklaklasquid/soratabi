import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useModels } from "../Hooks/useModels";

function PlaneForText() {
  const { plane } = useModels();
  const planeRef = useRef<THREE.Object3D>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const speed = 2;

    planeRef.current.position.y = Math.sin(time * speed) / 4;
    planeRef.current.rotation.z = Math.sin(time * speed) / 4 + 3.5;
  });

  return (
    <primitive
      ref={planeRef}
      object={plane.scene}
      scale={0.05}
      rotation={[-Math.PI / 1.5, Math.PI * 1.2, Math.PI]}
      position={[0, -0.5, 0]}
    />
  );
}

export default PlaneForText;
