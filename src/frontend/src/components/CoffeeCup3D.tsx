import { Environment, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SteamParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60;

  const { positions, velocities, lifetimes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const life = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 1] = Math.random() * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = 0.005 + Math.random() * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      life[i] = Math.random();
    }
    return { positions: pos, velocities: vel, lifetimes: life };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      lifetimes[i] += 0.008;
      if (lifetimes[i] > 1) {
        arr[i * 3] = (Math.random() - 0.5) * 0.3;
        arr[i * 3 + 1] = 0.9;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        lifetimes[i] = 0;
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#fffaf0"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CupMesh() {
  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xc9a35a,
        metalness: 0.85,
        roughness: 0.2,
        envMapIntensity: 1.5,
      }),
    [],
  );
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xf5f0e8,
        metalness: 0.1,
        roughness: 0.35,
      }),
    [],
  );
  const darkOuterMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x1a0f05,
        metalness: 0.3,
        roughness: 0.7,
        side: THREE.BackSide,
      }),
    [],
  );
  const coffeeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x3d1c02,
        metalness: 0.1,
        roughness: 0.9,
      }),
    [],
  );

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={[0, -0.3, 0]}>
        {/* Saucer */}
        <mesh position={[0, -0.72, 0]} material={bodyMat} castShadow>
          <cylinderGeometry args={[1.0, 0.95, 0.08, 40]} />
        </mesh>
        <mesh position={[0, -0.68, 0]} material={bodyMat}>
          <cylinderGeometry args={[0.45, 0.44, 0.04, 40]} />
        </mesh>
        {/* Cup body outer */}
        <mesh position={[0, 0, 0]} material={darkOuterMat} castShadow>
          <cylinderGeometry args={[0.65, 0.45, 1.12, 48, 1, true]} />
        </mesh>
        {/* Cup body inner */}
        <mesh position={[0, 0, 0]} material={bodyMat}>
          <cylinderGeometry args={[0.62, 0.43, 1.1, 48, 1, true]} />
        </mesh>
        {/* Cup bottom */}
        <mesh position={[0, -0.55, 0]} material={bodyMat}>
          <cylinderGeometry args={[0.43, 0.43, 0.02, 48]} />
        </mesh>
        {/* Gold rim */}
        <mesh position={[0, 0.57, 0]} material={goldMat}>
          <torusGeometry args={[0.62, 0.035, 16, 60]} />
        </mesh>
        {/* Coffee surface */}
        <mesh position={[0, 0.5, 0]} material={coffeeMat}>
          <cylinderGeometry args={[0.59, 0.59, 0.02, 48]} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.75, -0.05, 0]} material={goldMat}>
          <torusGeometry args={[0.28, 0.045, 12, 30, Math.PI]} />
        </mesh>
        {/* Base ring */}
        <mesh position={[0, -0.53, 0]} material={goldMat}>
          <torusGeometry args={[0.43, 0.025, 12, 48]} />
        </mesh>
        {/* Steam */}
        <group position={[0, 0.55, 0]}>
          <SteamParticles />
        </group>
      </group>
    </Float>
  );
}

export default function CoffeeCup3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 3.5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 3, 2]} intensity={2} color="#ffd080" />
      <pointLight position={[-2, 1, -1]} intensity={0.8} color="#c9a35a" />
      <pointLight position={[0, -1, 2]} intensity={0.4} color="#ffffff" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color="#ffe8a0"
        castShadow
      />
      <Environment preset="city" />
      <CupMesh />
    </Canvas>
  );
}
