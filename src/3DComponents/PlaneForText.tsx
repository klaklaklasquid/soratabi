import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function PlaneForText() {
  const plane = useGLTF("/Airplane.glb") as GLTFResult;
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

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

useGLTF.preload("/Airplane.glb");

export default PlaneForText;
