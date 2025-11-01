import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

function Globe() {
  const globe = useGLTF("/earthReallyGood.glb") as GLTFResult;
  const meshRef = useRef<Group>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={meshRef} rotation={[0.3, -1, -0.7]}>
      <primitive object={globe.scene} scale={1} />
    </group>
  );
}

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

useGLTF.preload("/earthReallyGood.glb");

export default Globe;
