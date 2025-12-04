import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface UFOProps {
  size?: number;
  position?: [number, number, number];
  primaryColor?: string;
  accentColor?: string;
  glowColor?: string;
}

export function DataCube({
  size = 1,
  position = [0, 0, 0],
  primaryColor = '#00baff',
  accentColor = '#ffeb3b',
  glowColor = '#00baff',
}: UFOProps) {
  const ufoRef = useRef<THREE.Group>(null);
  const topDomeRef = useRef<THREE.Mesh>(null);
  const lightsRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  // Materials
  const materials = useMemo(() => ({
    neonBlue: new THREE.MeshStandardMaterial({
      color: new THREE.Color(primaryColor),
      metalness: 0.9,
      roughness: 0.1,
      emissive: new THREE.Color(primaryColor),
      emissiveIntensity: 1.2,
      toneMapped: false,
    }),
    neonYellow: new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      metalness: 0.9,
      roughness: 0.1,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 1.5,
      toneMapped: false,
    }),
    chrome: new THREE.MeshStandardMaterial({
      color: '#e0e0e0',
      metalness: 1.0,
      roughness: 0.1,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: new THREE.Color(primaryColor),
      metalness: 0.95,
      roughness: 0.05,
      transparent: true,
      opacity: 0.4,
    }),
    beam: new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.3,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.8,
      side: THREE.DoubleSide,
    }),
  }), [primaryColor, accentColor, glowColor]);

  // Animation - flying across entire screen in complex pattern
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (ufoRef.current) {
      // Complex flight pattern across entire viewport
      const flySpeed = 0.35;
      
      // Horizontal: figure-8 pattern across full width
      ufoRef.current.position.x = Math.sin(t * flySpeed) * 6;
      
      // Vertical: cover full height with sine wave
      ufoRef.current.position.y = Math.cos(t * flySpeed * 0.7) * 3;
      
      // Depth: forward and back for 3D effect
      ufoRef.current.position.z = Math.sin(t * 0.6) * 0.5;
      
      // Dynamic rotation based on movement direction
      const velocityX = Math.cos(t * flySpeed) * flySpeed * 6;
      const velocityY = -Math.sin(t * flySpeed * 0.7) * flySpeed * 0.7 * 3;
      ufoRef.current.rotation.z = -velocityX * 0.08;
      ufoRef.current.rotation.x = velocityY * 0.05;
      ufoRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    }

    // Fast dome rotation for sci-fi effect
    if (topDomeRef.current) {
      topDomeRef.current.rotation.y = t * 3;
    }

    // Counter-rotating lights
    if (lightsRef.current) {
      lightsRef.current.rotation.y = -t * 2.5;
    }

    // Pulsing beam
    if (beamRef.current) {
      const pulse = 0.2 + Math.sin(t * 4) * 0.15;
      beamRef.current.material.opacity = pulse;
      beamRef.current.scale.y = 0.8 + Math.sin(t * 3) * 0.2;
    }
  });

  return (
    <group ref={ufoRef} position={position} scale={size * 2.2}>
      {/* Main saucer body - chrome with neon blue accents */}
      <mesh material={materials.chrome}>
        <cylinderGeometry args={[1.0, 0.6, 0.2, 48]} />
      </mesh>

      {/* Outer energy ring - pulsing neon blue */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.neonBlue}>
        <torusGeometry args={[0.85, 0.12, 20, 48]} />
      </mesh>

      {/* Inner energy ring - yellow */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} material={materials.neonYellow}>
        <torusGeometry args={[0.72, 0.06, 16, 40]} />
      </mesh>

      {/* Holographic hexagonal panels around edge */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const angle = (i / 9) * Math.PI * 2;
        return (
          <group key={`panel-${i}`} position={[Math.cos(angle) * 0.95, 0, Math.sin(angle) * 0.95]}>
            <mesh 
              rotation={[0, -angle, 0]}
              material={materials.glass}
            >
              <cylinderGeometry args={[0.12, 0.12, 0.02, 6]} />
            </mesh>
            {/* Neon outline */}
            <mesh 
              rotation={[0, -angle, 0]}
              material={i % 2 === 0 ? materials.neonBlue : materials.neonYellow}
            >
              <cylinderGeometry args={[0.13, 0.13, 0.01, 6]} />
            </mesh>
          </group>
        );
      })}

      {/* Plasma energy tendrils */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh 
            key={`tendril-${i}`}
            position={[Math.cos(angle) * 0.6, -0.1, Math.sin(angle) * 0.6]}
            rotation={[Math.PI / 6, angle, 0]}
            material={materials.beam}
          >
            <torusGeometry args={[0.15, 0.02, 8, 16, Math.PI]} />
          </mesh>
        );
      })}

      {/* Top dome - glass with blue tint and rotating inner sphere */}
      <mesh ref={topDomeRef} position={[0, 0.2, 0]} material={materials.glass}>
        <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {/* Inner dome glow - rotating core */}
      <mesh position={[0, 0.25, 0]} material={materials.neonBlue}>
        <sphereGeometry args={[0.3, 24, 24]} />
      </mesh>

      {/* Energy core rings inside dome */}
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 4, 0, 0]} material={materials.neonYellow}>
        <torusGeometry args={[0.2, 0.02, 12, 24]} />
      </mesh>
      <mesh position={[0, 0.25, 0]} rotation={[0, Math.PI / 4, Math.PI / 2]} material={materials.neonBlue}>
        <torusGeometry args={[0.18, 0.02, 12, 24]} />
      </mesh>

      {/* Bottom plate with details */}
      <mesh position={[0, -0.15, 0]} material={materials.chrome}>
        <cylinderGeometry args={[0.55, 0.5, 0.08, 48]} />
      </mesh>

      {/* Bottom energy rings */}
      <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.neonYellow}>
        <torusGeometry args={[0.4, 0.05, 16, 32]} />
      </mesh>
      <mesh position={[0, -0.19, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.neonBlue}>
        <torusGeometry args={[0.25, 0.03, 12, 24]} />
      </mesh>

      {/* Rotating lights around the edge - more of them */}
      <group ref={lightsRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const angle = (i / 12) * Math.PI * 2;
          const isYellow = i % 2 === 0;
          return (
            <group key={i} position={[Math.cos(angle) * 0.85, 0, Math.sin(angle) * 0.85]}>
              <mesh material={isYellow ? materials.neonYellow : materials.neonBlue}>
                <sphereGeometry args={[0.06, 12, 12]} />
              </mesh>
              <pointLight 
                color={isYellow ? accentColor : primaryColor} 
                intensity={2} 
                distance={2} 
              />
            </group>
          );
        })}
      </group>

      {/* Center bottom energy core */}
      <mesh position={[0, -0.2, 0]} material={materials.neonYellow}>
        <sphereGeometry args={[0.15, 20, 20]} />
      </mesh>

      {/* Enhanced tractor beam with energy particles */}
      <mesh ref={beamRef} position={[0, -0.7, 0]} material={materials.beam}>
        <coneGeometry args={[0.6, 1.5, 12, 1, true]} />
      </mesh>
      
      {/* Beam energy rings */}
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={`beam-ring-${i}`}
          position={[0, -0.3 - i * 0.3, 0]} 
          rotation={[Math.PI / 2, 0, 0]} 
          material={materials.beam}
        >
          <torusGeometry args={[0.15 + i * 0.15, 0.02, 8, 24]} />
        </mesh>
      ))}

      {/* Advanced antenna array */}
      <mesh position={[0, 0.5, 0]} material={materials.chrome}>
        <cylinderGeometry args={[0.03, 0.02, 0.2, 8]} />
      </mesh>
      <mesh position={[0, 0.6, 0]} material={materials.neonYellow}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>
      {/* Satellite dishes */}
      {[-0.15, 0.15].map((x, i) => (
        <group key={`dish-${i}`} position={[x, 0.35, 0]}>
          <mesh rotation={[Math.PI / 4, 0, 0]} material={materials.chrome}>
            <cylinderGeometry args={[0.08, 0.02, 0.05, 16]} />
          </mesh>
          <mesh position={[0, 0.02, 0]} material={materials.neonBlue}>
            <sphereGeometry args={[0.02, 8, 8]} />
          </mesh>
        </group>
      ))}

      {/* Energy shield rings */}
      {[1.2, 1.4, 1.6].map((radius, i) => (
        <mesh 
          key={`shield-${i}`}
          rotation={[Math.PI / 2, 0, 0]} 
          material={materials.beam}
        >
          <torusGeometry args={[radius, 0.01, 8, 32]} />
        </mesh>
      ))}

      {/* Circuit pattern lines on top */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh 
            key={`circuit-${i}`}
            position={[Math.cos(angle) * 0.4, 0.08, Math.sin(angle) * 0.4]}
            rotation={[0, angle, Math.PI / 2]}
            material={materials.neonYellow}
          >
            <boxGeometry args={[0.3, 0.01, 0.01]} />
          </mesh>
        );
      })}

      {/* Main lights with bloom effect */}
      <pointLight color={primaryColor} intensity={3} distance={4} decay={2} />
      <pointLight position={[0, -0.7, 0]} color={accentColor} intensity={2} distance={3} decay={2} />
      <pointLight position={[0, 0.6, 0]} color={accentColor} intensity={1.5} distance={2} />
    </group>
  );
}
