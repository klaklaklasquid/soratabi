import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import Marker from "./Marker";
import GlobeLocationDetail from "../Components/browseComponents/GlobeLocationDetail";

function GlobeMap({ locations }: GlobeMapProps) {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationsData | null>(null);
  const globe = useGLTF("/earthReallyGood.glb") as GLTFResult;

  const handleMarkerClick = (data: LocationsData) => {
    setSelectedLocation(data);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="min-h-2/3">
        <Canvas camera={{ position: [0, 0, 2.1 * 1.75] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 5, 10]} intensity={1} />

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={2.1 * 1.05}
            maxDistance={2.1 * 5}
          />

          <group>
            <primitive
              object={globe.scene}
              scale={2.05}
              rotation={[0.54, Math.PI / 0.71, 0]}
              onPointerMissed={() => null}
            />

            {locations.map((location) => (
              <Marker
                key={location.id}
                radius={2.05}
                onLocationClick={handleMarkerClick}
                {...location}
              />
            ))}
          </group>
        </Canvas>
      </div>

      <div className="p-5">
        <h2>Location Details</h2>

        {selectedLocation ? (
          <GlobeLocationDetail
            data={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        ) : (
          <p>Click a marker on the globe to see its details.</p>
        )}
      </div>
    </div>
  );
}

interface GlobeMapProps {
  locations: LocationsData[];
}

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

useGLTF.preload("/earthReallyGood.glb");

export default GlobeMap;
