import * as THREE from "three";

export function getMarkerPosition(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  // convert degrees to radians
  const latRad = lat * (Math.PI / 180);
  const lngRad = lng * (Math.PI / 180);

  // apply cartesian conversion (y is up, z is longitude 0)
  const x = radius * Math.cos(latRad) * Math.sin(lngRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.cos(lngRad);

  return new THREE.Vector3(x, y, z);
}
