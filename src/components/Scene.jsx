import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RubiksCube from './RubiksCube';

export default function Scene({ cubeState, animating, animationRef }) {
  return (
    <Canvas
      camera={{ position: [4.5, 3.5, 4.5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />
      <directionalLight position={[-3, -2, -3]} intensity={0.3} />
      <RubiksCube
        cubeState={cubeState}
        animating={animating}
        animationRef={animationRef}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={15}
        dampingFactor={0.1}
        enableDamping
      />
    </Canvas>
  );
}
