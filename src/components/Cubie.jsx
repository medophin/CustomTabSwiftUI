import { useRef } from 'react';
import { getCubieFaceColor } from '../cube';

const GAP = 0.06;
const SIZE = 0.92;
const BEVEL = 0.04;

function FaceSticker({ position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[SIZE - BEVEL * 2, SIZE - BEVEL * 2]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

export default function Cubie({ x, y, z, cubeState }) {
  const ref = useRef();
  const offset = 0.5 + GAP;

  const faces = [
    { dir: 'px', pos: [offset, 0, 0], rot: [0, Math.PI / 2, 0] },
    { dir: 'nx', pos: [-offset, 0, 0], rot: [0, -Math.PI / 2, 0] },
    { dir: 'py', pos: [0, offset, 0], rot: [-Math.PI / 2, 0, 0] },
    { dir: 'ny', pos: [0, -offset, 0], rot: [Math.PI / 2, 0, 0] },
    { dir: 'pz', pos: [0, 0, offset], rot: [0, 0, 0] },
    { dir: 'nz', pos: [0, 0, -offset], rot: [0, Math.PI, 0] },
  ];

  return (
    <group ref={ref} position={[x * (1 + GAP), y * (1 + GAP), z * (1 + GAP)]}>
      {/* Black cubie body */}
      <mesh>
        <boxGeometry args={[SIZE, SIZE, SIZE]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
      {/* Colored stickers */}
      {faces.map(({ dir, pos, rot }) => {
        const color = getCubieFaceColor(cubeState, x, y, z, dir);
        if (color === '#1a1a1a') return null;
        return <FaceSticker key={dir} position={pos} rotation={rot} color={color} />;
      })}
    </group>
  );
}
