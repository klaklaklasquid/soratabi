import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { useModels } from "../Hooks/useModels";

function Plane() {
  const { plane } = useModels();
  const meshRef = useRef<Group>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const radius = 0.95;
      const speed = 0.5;

      meshRef.current.position.x = Math.cos(time * speed) * radius;
      meshRef.current.position.z = Math.sin(time * speed) * radius;

      meshRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <group ref={meshRef}>
        <primitive
          object={plane.scene}
          scale={0.0075}
          rotation={[-Math.PI / 2, Math.PI / 4, 0]}
        />
      </group>
    </group>
  );
}

export default Plane;
