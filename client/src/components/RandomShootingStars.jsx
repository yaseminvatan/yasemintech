// src/components/RandomShootingStars.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

function SingleShootingStar({ delay = 0 }) {
  const starRef = useRef();
  const [position, setPosition] = useState(new THREE.Vector3());
  const [velocity, setVelocity] = useState(new THREE.Vector3());
  const [trailWidth, setTrailWidth] = useState(1);
  const [active, setActive] = useState(false);

  // Reset with random parameters
  const reset = () => {
    const startX = -20 + Math.random() * 10;
    const startY = 10 + Math.random() * 5;
    const startZ = -10 + Math.random() * 20;
    const speed = 0.05 + Math.random() * 0.1;

    setPosition(new THREE.Vector3(startX, startY, startZ));
    setVelocity(new THREE.Vector3(speed, -speed * 0.7, speed * 0.2));
    setTrailWidth(0.5 + Math.random() * 1.5);
    setActive(true);
  };

  // Initial delay before first appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      reset();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame(() => {
    if (active && starRef.current) {
      starRef.current.position.add(velocity);

      if (
        starRef.current.position.x > 20 ||
        starRef.current.position.y < -10 ||
        starRef.current.position.z > 20
      ) {
        setActive(false);
        setTimeout(() => reset(), 1000 + Math.random() * 3000); // delay before reappearing
      }
    }
  });

  return active ? (
    <Trail
      width={trailWidth}
      length={10}
      decay={0.85}
      color={'#FFD700'}
      attenuation={(t) => t * t}
    >
      <mesh ref={starRef} position={position.clone()}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          emissive={'#ffffff'}
          emissiveIntensity={5}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  ) : null;
}

export function RandomShootingStars({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SingleShootingStar key={i} delay={Math.random() * 5000} />
      ))}
    </>
  );
}
