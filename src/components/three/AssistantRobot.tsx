import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AssistantRobotProps {
  size?: number;
  metalColor?: string;
  accentColor?: string;
  eyeColor?: string;
  position?: [number, number, number];
}

export function AssistantRobot({
  size = 1,
  metalColor = '#9aa7b0',
  accentColor = '#0ff3ff',
  eyeColor = '#00baff',
  position = [0, 0, 0],
}: AssistantRobotProps) {
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const headLightRef = useRef<THREE.PointLight>(null);

  // Materials
  const materials = useMemo(() => ({
    metal: new THREE.MeshStandardMaterial({
      color: new THREE.Color(metalColor),
      metalness: 1.0,
      roughness: 0.35,
      envMapIntensity: 1.0,
    }),
    panel: new THREE.MeshStandardMaterial({
      color: 0x111216,
      metalness: 0.3,
      roughness: 0.6,
    }),
    neonEye: new THREE.MeshStandardMaterial({
      color: new THREE.Color(eyeColor),
      emissive: new THREE.Color(eyeColor),
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.0,
      toneMapped: false,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.4,
      roughness: 0.7,
      metalness: 0.0,
      toneMapped: false,
    }),
    ring: new THREE.MeshBasicMaterial({
      color: new THREE.Color(eyeColor),
      side: THREE.DoubleSide,
      toneMapped: false,
    }),
    holographic: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    }),
  }), [metalColor, accentColor, eyeColor]);

  // Animation
  useFrame((state: any) => {
    const elapsed = state.clock.elapsedTime;
    const t = elapsed;

    if (robotRef.current) {
      // Keep robot centered with gentle floating animation
      robotRef.current.position.x = 0;
      
      // Gentle floating bob
      const bob = Math.sin(t * 1.2) * 0.03;
      robotRef.current.position.y = bob;
    }

    if (headRef.current) {
      // Head rotation: 360° swing every 30s, otherwise normal 120° turns
      const headCycle = t % 30;
      
      if (headCycle < 2) {
        // 360° loop over 2 seconds every 30s
        headRef.current.rotation.y = (headCycle / 2) * Math.PI * 2;
      } else {
        // Normal head movement: limited to 120° (Math.PI * 0.66)
        const headRange = Math.PI * 0.66; // 120 degrees
        headRef.current.rotation.y = Math.sin(t * 0.9) * headRange;
      }
    }

    if (neckRef.current) {
      // Small internal rotation for neck
      neckRef.current.rotation.x = Math.sin(t * 0.6) * 0.02;
    }

    if (leftArmRef.current && rightArmRef.current) {
      // More dynamic arm movements with gentler sway
      const armRange = 0.15; // Reduced from 0.25 for gentler movement
      
      // Gentle arm sway during slide (smooth and natural)
      leftArmRef.current.rotation.z = Math.sin(t * 2) * armRange;
      rightArmRef.current.rotation.z = -Math.sin(t * 2) * armRange;
      leftArmRef.current.rotation.x = Math.sin(t * 1.5) * 0.1; // Reduced from 0.3
      rightArmRef.current.rotation.x = -Math.sin(t * 1.5) * 0.1;
      
      // Wave animation every 15 seconds (right arm)
      const waveTime = t % 15;
      if (waveTime < 1.5) {
        // Right arm waves
        rightArmRef.current.rotation.z = -0.5 - Math.sin(waveTime * 4) * 0.4;
        rightArmRef.current.rotation.x = Math.sin(waveTime * 8) * 0.2;
      }
    }

    if (eyeLeftRef.current && eyeRightRef.current) {
      // Dynamic eye color cycling: Blue -> Cyan -> Green -> Yellow -> Orange -> Red -> Purple -> Blue
      const colorCycle = (t % 21) / 3; // 7 colors, 3 seconds each = 21 seconds full cycle
      const colorIndex = Math.floor(colorCycle);
      const colorProgress = colorCycle - colorIndex;
      
      const colors = [
        new THREE.Color(0x00baff), // Blue
        new THREE.Color(0x00ffff), // Cyan
        new THREE.Color(0x00ff88), // Green
        new THREE.Color(0xffff00), // Yellow
        new THREE.Color(0xff8800), // Orange
        new THREE.Color(0xff0044), // Red
        new THREE.Color(0xaa00ff), // Purple
      ];
      
      const currentColor = colors[colorIndex % 7];
      const nextColor = colors[(colorIndex + 1) % 7];
      const eyeColor = currentColor.clone().lerp(nextColor, colorProgress);
      
      // Eyes pulsate with current color
      const pulse = (Math.sin(t * 3.0) + 1) / 2; // 0..1
      const eyeIntensity = 1.0 + pulse * 0.8;
      const eyeScale = 1 + pulse * 0.08;

      if (eyeLeftRef.current.material instanceof THREE.MeshStandardMaterial) {
        eyeLeftRef.current.material.color.copy(eyeColor);
        eyeLeftRef.current.material.emissive.copy(eyeColor);
        eyeLeftRef.current.material.emissiveIntensity = eyeIntensity;
      }
      if (eyeRightRef.current.material instanceof THREE.MeshStandardMaterial) {
        eyeRightRef.current.material.color.copy(eyeColor);
        eyeRightRef.current.material.emissive.copy(eyeColor);
        eyeRightRef.current.material.emissiveIntensity = eyeIntensity;
      }

      eyeLeftRef.current.scale.setScalar(eyeScale);
      eyeRightRef.current.scale.setScalar(eyeScale);
      
      // Update head light color to match eyes
      if (headLightRef.current) {
        headLightRef.current.color.copy(eyeColor);
      }
    }
  });

  return (
    <group ref={robotRef} position={position} scale={size}>
      {/* Torso */}
      <group name="torso">
        {/* Main body with rounded edges */}
        <mesh castShadow receiveShadow material={materials.metal}>
          <boxGeometry args={[1.2, 1.6, 0.6, 3, 3, 3]} />
        </mesh>

        {/* Front panel */}
        <mesh position={[0, -0.05, 0.31]} material={materials.panel}>
          <planeGeometry args={[0.8, 1.0]} />
        </mesh>

        {/* Multiple accent strips for detail */}
        <mesh position={[0, -0.45, 0.315]} material={materials.accent}>
          <boxGeometry args={[0.5, 0.05, 0.02]} />
        </mesh>
        
        {/* Top accent strip */}
        <mesh position={[0, 0.65, 0.315]} material={materials.accent}>
          <boxGeometry args={[0.6, 0.03, 0.02]} />
        </mesh>

        {/* Side vents */}
        <mesh position={[-0.58, 0.2, 0.1]} rotation={[0, Math.PI / 2, 0]} material={materials.panel}>
          <planeGeometry args={[0.3, 0.15]} />
        </mesh>
        <mesh position={[0.58, 0.2, 0.1]} rotation={[0, -Math.PI / 2, 0]} material={materials.panel}>
          <planeGeometry args={[0.3, 0.15]} />
        </mesh>

        {/* Neck + Head */}
        <group ref={neckRef} position={[0, 0.95, 0]} name="neck">
          {/* Neck */}
          <mesh position={[0, -0.11, 0]} material={materials.metal}>
            <cylinderGeometry args={[0.12, 0.15, 0.22, 12]} />
          </mesh>

          {/* Head */}
          <group ref={headRef} position={[0, 0.23, 0]} name="head">
            {/* Head shell - more rounded */}
            <mesh castShadow receiveShadow material={materials.metal}>
              <boxGeometry args={[0.9, 0.7, 0.65, 6, 6, 6]} />
            </mesh>

            {/* Top antenna */}
            <mesh position={[0, 0.4, 0]} material={materials.accent}>
              <cylinderGeometry args={[0.02, 0.03, 0.15, 8]} />
            </mesh>
            <mesh position={[0, 0.5, 0]} material={materials.accent}>
              <sphereGeometry args={[0.05, 16, 16]} />
            </mesh>

            {/* Visor frame */}
            <mesh position={[0, 0.02, 0.325]} material={materials.accent}>
              <boxGeometry args={[0.78, 0.22, 0.02]} />
            </mesh>
            
            {/* Visor inner */}
            <mesh position={[0, 0.02, 0.315]} material={materials.panel}>
              <boxGeometry args={[0.74, 0.18, 0.05]} />
            </mesh>

            {/* Ear panels */}
            <mesh position={[-0.52, 0, 0]} material={materials.panel}>
              <boxGeometry args={[0.12, 0.3, 0.3]} />
            </mesh>
            <mesh position={[0.52, 0, 0]} material={materials.panel}>
              <boxGeometry args={[0.12, 0.3, 0.3]} />
            </mesh>

            {/* Eyes */}
            <group position={[0, 0, 0.34]} name="eyes">
              {/* Left eye */}
              <mesh ref={eyeLeftRef} position={[-0.18, 0.02, 0]} material={materials.neonEye}>
                <sphereGeometry args={[0.07, 16, 16]} />
              </mesh>

              {/* Right eye */}
              <mesh ref={eyeRightRef} position={[0.18, 0.02, 0]} material={materials.neonEye}>
                <sphereGeometry args={[0.07, 16, 16]} />
              </mesh>

              {/* Glow rings */}
              <mesh position={[-0.18, 0.02, -0.01]} rotation={[Math.PI / 2, 0, 0]} material={materials.ring}>
                <ringGeometry args={[0.08, 0.13, 32]} />
              </mesh>
              <mesh position={[0.18, 0.02, -0.01]} rotation={[Math.PI / 2, 0, 0]} material={materials.ring}>
                <ringGeometry args={[0.08, 0.13, 32]} />
              </mesh>

              {/* Eye highlights for more life */}
              <mesh position={[-0.18, 0.04, 0.06]} material={new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })}>
                <sphereGeometry args={[0.02, 8, 8]} />
              </mesh>
              <mesh position={[0.18, 0.04, 0.06]} material={new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })}>
                <sphereGeometry args={[0.02, 8, 8]} />
              </mesh>
            </group>

            {/* Holographic overlay planes (GitHub Universe style) */}
            <mesh position={[0, 0, 0.4]} material={materials.holographic}>
              <planeGeometry args={[1.0, 0.8]} />
            </mesh>
            <mesh position={[0, 0, 0.42]} rotation={[0, Math.PI / 12, 0]} material={materials.holographic}>
              <planeGeometry args={[1.0, 0.8]} />
            </mesh>
            <mesh position={[0, 0, 0.44]} rotation={[0, -Math.PI / 12, 0]} material={materials.holographic}>
              <planeGeometry args={[1.0, 0.8]} />
            </mesh>

            {/* Head light with more intensity */}
            <pointLight ref={headLightRef} color={eyeColor} intensity={1.2} distance={4} decay={2} position={[0, 0.25, 0.8]} />
          </group>
        </group>

        {/* Left Arm - more detailed */}
        <group ref={leftArmRef} position={[-0.85, 0.25, 0]} name="leftArm">
          {/* Shoulder joint */}
          <mesh position={[0.15, 0, 0]} material={materials.panel}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          
          {/* Upper arm */}
          <mesh position={[0, -0.3, 0]} material={materials.metal}>
            <boxGeometry args={[0.18, 0.6, 0.16, 2, 2, 2]} />
          </mesh>
          
          {/* Elbow joint */}
          <mesh position={[0, -0.65, 0]} material={materials.accent}>
            <sphereGeometry args={[0.1, 12, 12]} />
          </mesh>
          
          {/* Lower arm */}
          <mesh position={[0, -0.95, 0]} material={materials.metal}>
            <boxGeometry args={[0.16, 0.5, 0.14, 2, 2, 2]} />
          </mesh>
          
          {/* Hand */}
          <mesh position={[0, -1.25, 0]} material={materials.panel}>
            <boxGeometry args={[0.18, 0.12, 0.16]} />
          </mesh>
        </group>

        {/* Right Arm - more detailed */}
        <group ref={rightArmRef} position={[0.85, 0.25, 0]} name="rightArm">
          {/* Shoulder joint */}
          <mesh position={[-0.15, 0, 0]} material={materials.panel}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          
          {/* Upper arm */}
          <mesh position={[0, -0.3, 0]} material={materials.metal}>
            <boxGeometry args={[0.18, 0.6, 0.16, 2, 2, 2]} />
          </mesh>
          
          {/* Elbow joint */}
          <mesh position={[0, -0.65, 0]} material={materials.accent}>
            <sphereGeometry args={[0.1, 12, 12]} />
          </mesh>
          
          {/* Lower arm */}
          <mesh position={[0, -0.95, 0]} material={materials.metal}>
            <boxGeometry args={[0.16, 0.5, 0.14, 2, 2, 2]} />
          </mesh>
          
          {/* Hand */}
          <mesh position={[0, -1.25, 0]} material={materials.panel}>
            <boxGeometry args={[0.18, 0.12, 0.16]} />
          </mesh>
        </group>
      </group>

      {/* Legs - more detailed */}
      <group position={[0, -1.05, 0]} name="legs">
        {/* Left leg */}
        <mesh position={[-0.28, -0.35, 0]} material={materials.metal}>
          <boxGeometry args={[0.26, 0.7, 0.26, 2, 2, 2]} />
        </mesh>
        
        {/* Left knee joint */}
        <mesh position={[-0.28, -0.72, 0]} material={materials.accent}>
          <sphereGeometry args={[0.14, 12, 12]} />
        </mesh>

        {/* Right leg */}
        <mesh position={[0.28, -0.35, 0]} material={materials.metal}>
          <boxGeometry args={[0.26, 0.7, 0.26, 2, 2, 2]} />
        </mesh>
        
        {/* Right knee joint */}
        <mesh position={[0.28, -0.72, 0]} material={materials.accent}>
          <sphereGeometry args={[0.14, 12, 12]} />
        </mesh>

        {/* Left foot - more detailed */}
        <mesh position={[-0.28, -0.75, 0.06]} material={materials.panel}>
          <boxGeometry args={[0.38, 0.08, 0.5, 2, 2, 2]} />
        </mesh>
        
        {/* Left foot detail */}
        <mesh position={[-0.28, -0.73, 0.28]} material={materials.accent}>
          <boxGeometry args={[0.32, 0.03, 0.08]} />
        </mesh>

        {/* Right foot - more detailed */}
        <mesh position={[0.28, -0.75, 0.06]} material={materials.panel}>
          <boxGeometry args={[0.38, 0.08, 0.5, 2, 2, 2]} />
        </mesh>
        
        {/* Right foot detail */}
        <mesh position={[0.28, -0.73, 0.28]} material={materials.accent}>
          <boxGeometry args={[0.32, 0.03, 0.08]} />
        </mesh>
      </group>
    </group>
  );
}
