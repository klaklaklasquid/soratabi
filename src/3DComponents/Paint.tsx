import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Paint() {
  const paint = useGLTF("/paint.glb") as GLTFResult;
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

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

useGLTF.preload("/paint.glb");

export default Paint;
