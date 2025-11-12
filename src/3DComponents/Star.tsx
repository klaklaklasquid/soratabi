import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Star() {
  const { scene } = useGLTF("/star.glb") as GLTFResult;
  const starRef = useRef<THREE.Object3D>(null!);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    starRef.current.rotation.y += delta * 0.5;
    starRef.current.rotation.z = Math.sin(time) / 1.5;
  });

  return <primitive ref={starRef} object={scene} />;
}

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

useGLTF.preload("/star.glb");

export default Star;
