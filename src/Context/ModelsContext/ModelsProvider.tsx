import React from "react";
import * as THREE from "three";
import { ModelContext } from "./ModelContext";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/Addons.js";

function ModelsProvider({ children }: { children: React.ReactNode }) {
  const earth = useGLTF("/earthReallyGood.glb") as GLTFResult;
  const plane = useGLTF("/Airplane.glb") as GLTFResult;
  const paint = useGLTF("/paint.glb") as GLTFResult;
  const star = useGLTF("/star.glb") as GLTFResult;
  const rainbow = useGLTF("/rainbow.glb") as GLTFResult;

  return (
    <ModelContext.Provider value={{ earth, plane, paint, star, rainbow }}>
      {children}
    </ModelContext.Provider>
  );
}

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

useGLTF.preload("/earthReallyGood.glb");
useGLTF.preload("/Airplane.glb");
useGLTF.preload("/paint.glb");
useGLTF.preload("/star.glb");
useGLTF.preload("/rainbow.glb");

export default ModelsProvider;
