import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { useModels } from "../Hooks/useModels";

function Globe() {
  const { earth } = useModels();
  const meshRef = useRef<Group>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={meshRef} rotation={[0.3, -1, -0.7]} position={[0, 0, -0.1]}>
      <primitive object={earth.scene} scale={1} />
    </group>
  );
}

export default Globe;
