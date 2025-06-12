// src/pages/SignIn.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html } from '@react-three/drei';
import '../assets/SignIn.css';
import SignInForm from '../components/SignInForm';
import { RandomShootingStars } from '../components/RandomShootingStars';
import Navbar from '../components/NavbarPages';

function RotatingStars() {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005; // slow, smooth rotation
    }
  });

  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
    </group>
  );
}

export default function SignIn() {
  return (
    <>
    <Navbar></Navbar>
    <div className="signin-canvas-container">
    <Canvas camera={{ position: [0, 0, 5] }}>
      <RotatingStars />
      <RandomShootingStars count={5} />
      <Html center>
        <SignInForm />
      </Html>
    </Canvas>
    </div>
    </>
  );
}
