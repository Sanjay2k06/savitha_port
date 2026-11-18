"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HaloMesh({ isHovered }) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // Normalized cursor coordinates [-1, 1]

    // Interactive mouse tracking: halo tilts smoothly towards user cursor
    const targetRotX = 1.25 + pointer.y * 0.35 + Math.sin(t * 1.2) * 0.05;
    const targetRotZ = -pointer.x * 0.35 + Math.cos(t * 0.9) * 0.06;
    const targetScale = isHovered ? 1.15 : 1.0;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.08);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.08);
    meshRef.current.rotation.y += delta * (isHovered ? 1.5 : 0.6); // Spins faster on hover!
    meshRef.current.position.y = Math.sin(t * 1.5) * 0.06;

    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <mesh ref={meshRef} rotation={[1.25, 0, 0]}>
      {/* Torus args: [radius, tube, radialSegments, tubularSegments] */}
      <torusGeometry args={[1.35, 0.22, 32, 100]} />
      <meshStandardMaterial
        color="#F7C844"
        metalness={0.94}
        roughness={0.14}
        emissive="#4A3403"
        emissiveIntensity={isHovered ? 0.35 : 0.15}
      />
    </mesh>
  );
}

export default function GoldenHalo({ className = "" }) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative w-20 h-12 sm:w-24 sm:h-14 flex items-center justify-center select-none pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
      title="Radiance Halo"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {mounted ? (
        <Suspense
          fallback={
            <div className="w-14 h-6 rounded-full border-[3px] border-[#e8c366] shadow-[0_0_12px_rgba(240,186,54,0.4)] opacity-90" />
          }
        >
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 42 }}
            gl={{ alpha: true, antialias: true }}
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <ambientLight intensity={1.8} />
            <directionalLight position={[4, 6, 3]} intensity={2.8} color="#FFFFFF" />
            <directionalLight position={[-4, -3, 2]} intensity={1.5} color="#FFE680" />
            <pointLight position={[0, 4, 1]} intensity={2.2} color="#FFDF66" />
            <HaloMesh isHovered={isHovered} />
          </Canvas>
        </Suspense>
      ) : (
        <div className="w-14 h-6 rounded-full border-[3px] border-[#e8c366] shadow-[0_0_12px_rgba(240,186,54,0.4)] opacity-90" />
      )}
    </div>
  );
}
