import { createContext } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/Addons.js";

export const ModelContext = createContext<ModelContextInterface | undefined>(
  undefined,
);

interface ModelContextInterface {
  earth: GLTFResult;
  plane: GLTFResult;
  paint: GLTFResult;
  star: GLTFResult;
  rainbow: GLTFResult;
}

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};
