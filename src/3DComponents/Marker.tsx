import { useMemo } from "react";
import { getMarkerPosition } from "./utils/getMarkerPosition";
import { ThreeEvent } from "@react-three/fiber";

function Marker(props: MarkerProps) {
  const { latitude, longitude, radius, onLocationClick, ...locationData } =
    props;

  const position = useMemo(
    () => getMarkerPosition(latitude, longitude, radius + 0.01),
    [latitude, longitude, radius],
  );

  const markerSize = radius * 0.02;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onLocationClick(locationData as LocationsData);
  };

  return (
    <group position={position}>
      <mesh onClick={handleClick}>
        <sphereGeometry args={[markerSize, 16, 16]} />
        <meshStandardMaterial
          color={"white"}
          emissive={"white"}
          emissiveIntensity={1.5}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

interface MarkerProps extends LocationsData {
  radius: number;
  onLocationClick: (data: LocationsData) => void;
}

export default Marker;
