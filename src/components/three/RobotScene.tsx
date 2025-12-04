import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { DataCube } from './DataCube';

interface DataCubeSceneProps {
  size?: number;
  autoRotate?: boolean;
  className?: string;
}

export function RobotScene({ size = 1.1, autoRotate = true, className = '' }: DataCubeSceneProps) {
  return (
    <div className={className} style={{ pointerEvents: 'none' }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0.8, 5], zoom: 80 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        {/* Lighting - optimized for robot without environment */}
        <ambientLight intensity={0.5} />
        <hemisphereLight args={['#ffffff', '#444444', 0.8]} />
        
        {/* Key light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Fill light */}
        <directionalLight
          position={[-3, 3, -3]}
          intensity={0.4}
        />
        
        {/* Rim light for depth */}
        <directionalLight
          position={[0, 2, -5]}
          intensity={0.3}
          color="#3b82f6"
        />
        
        {/* Accent lights for holographic effect */}
        <pointLight position={[-2, 3, 2]} intensity={0.5} color="#00baff" distance={8} />
        <pointLight position={[2, 3, 2]} intensity={0.3} color="#0ff3ff" distance={8} />

        {/* Data Cube */}
        <DataCube
          size={size}
          position={[0, 0, 0]}
          primaryColor="#00baff"
          accentColor="#0ff3ff"
          glowColor="#00baff"
        />

        {/* Controls */}
        <OrbitControls
          autoRotate={false}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
