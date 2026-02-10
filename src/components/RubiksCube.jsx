import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Cubie from './Cubie';

const positions = [];
for (let x = -1; x <= 1; x++)
  for (let y = -1; y <= 1; y++)
    for (let z = -1; z <= 1; z++)
      positions.push([x, y, z]);

export default function RubiksCube({ cubeState, animating, animationRef }) {
  const groupRef = useRef();
  const layerRef = useRef();

  useFrame((_, delta) => {
    if (!animating || !animationRef.current) return;
    const anim = animationRef.current;
    const speed = 8; // radians per second
    const step = speed * delta;
    anim.progress += step;

    if (anim.progress >= Math.PI / 2) {
      // Animation complete
      anim.onComplete();
      return;
    }

    if (layerRef.current) {
      const angle = anim.direction * anim.progress;
      if (anim.axis === 'x') layerRef.current.rotation.x = angle;
      else if (anim.axis === 'y') layerRef.current.rotation.y = angle;
      else if (anim.axis === 'z') layerRef.current.rotation.z = angle;
    }
  });

  // Separate cubies into animated layer and static
  let layerCubies = [];
  let staticCubies = [];

  if (animating && animationRef.current) {
    const { axis, layerValue } = animationRef.current;
    const axisIdx = axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
    positions.forEach(([x, y, z]) => {
      const val = [x, y, z][axisIdx];
      if (val === layerValue) {
        layerCubies.push([x, y, z]);
      } else {
        staticCubies.push([x, y, z]);
      }
    });
  } else {
    staticCubies = positions;
  }

  return (
    <group ref={groupRef}>
      {/* Static cubies */}
      {staticCubies.map(([x, y, z]) => (
        <Cubie key={`${x},${y},${z}`} x={x} y={y} z={z} cubeState={cubeState} />
      ))}
      {/* Animated layer */}
      {animating && (
        <group ref={layerRef}>
          {layerCubies.map(([x, y, z]) => (
            <Cubie key={`${x},${y},${z}`} x={x} y={y} z={z} cubeState={cubeState} />
          ))}
        </group>
      )}
    </group>
  );
}
