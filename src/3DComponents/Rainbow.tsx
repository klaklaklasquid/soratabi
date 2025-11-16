import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Rainbow() {
  const { scene } = useGLTF("/rainbow.glb") as GLTFResult;
  const rainbowRef = useRef<THREE.Object3D>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    rainbowRef.current.rotation.y = Math.sin(time);
  });

  return (
    <primitive
      ref={rainbowRef}
      object={scene}
      rotation={[0, 0, 0.15]}
      scale={0.75}
    />
  );
}

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

useGLTF.preload("/rainbow.glb");

export default Rainbow;
