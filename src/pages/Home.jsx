// src/pages/Home.jsx

// Import React Three Fiber and Drei tools for building 3D scenes
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars, useGLTF, useTexture, Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import '../assets/Underwater.css';
import { useNavigate } from 'react-router-dom';
import Navbar  from '../components/Navbar';

// Fish component: simple animated sphere that swims horizontally and loops back
function Fish({ position, color = 'orange', speed = 0.01 }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += speed;
      if (ref.current.position.x > 5) ref.current.position.x = -5;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Spearfisher component: loads and displays a 3D GLB model
function Spearfisher() {
  const { scene } = useGLTF('/models/spearfisher.glb');
  return <primitive object={scene} scale={0.5} position={[0, -1, 0]} />;
}

// CausticsPlane component: animated texture that simulates underwater light rays
function CausticsPlane() {
  const texture = useTexture('/textures/caustics.png');
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.map.offset.y += 0.01 * delta;
      ref.current.material.map.offset.x += 0.005 * delta;
    }
  });

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} ref={ref}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </mesh>
  );
}

// TreasureChest component: click to navigate
function SeaShell() {
  const {scene} = useGLTF('/models/sea-shell.glb');
  return (
    <>
      <Float floatIntensity={1}>
        <primitive object={scene} position={[-3, -1.2, 1]} scale={0.01} />
      </Float>

      <Float floatIntensity={1}>
        <primitive object={scene} position={[2.5, -1.1, -1]} scale={0.1} />
      </Float>
    </>
  )
}

//text buttons
function FloatingTextButton({ position, label, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Html distanceFactor={10} position={position}>
      <div
        className="floating-text-button"
        onClick={handleClick}
      >
        {label}
      </div>
    </Html>
  );
}
//floating text bio 
 function FloatingBio() {
  const handleClick = (url) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.2} position={[0, -2.8, 0]}>
      <Html center distanceFactor={10}>
        <div className="floating-bio">
          <p>
            I am an experienced GIS Specialist with over nine years of expertise in databases.
            I'm also a full-stack developer with a passion for creating efficient, user-friendly solutions.
          </p>
          <p>
            Outside of work, I'm all about adventure! A free diver, spearfisher, black belt in Taekwondo, and cyclist.
          </p>
          <div className="underwater-links">
            <button onClick={() => handleClick('https://github.com/yaseminvatan')}>GitHub</button>
            <button onClick={() => handleClick('https://linkedin.com/in/yaseminvatan')}>LinkedIn</button>
          </div>
        </div>
      </Html>
    </Float>
  );
}

// Main Home component that renders the full 3D scene
export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    <div className="underwater-container">
      <h2 className="underwater-title">Yasemin's<br />World!</h2>
      <h6 className='underwater-title'>This website is still underconstruction</h6>
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Underwater starfield effect */}
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        {/* Enable mouse control to rotate scene */}
        <OrbitControls enableZoom={false} />

        {/* Caustics effect on a flat plane */}
        <CausticsPlane />

        {/* Floating spearfisher model */}
        <Float>
          <Spearfisher />
        </Float>

        {/* Animated fish components */}
        <Fish position={[-2, 0.5, 0]} color="orange" speed={0.01} />
        <Fish position={[1, -0.5, 0]} color="pink" speed={0.008} />
        <Fish position={[-3, -1, 0]} color="yellow" speed={0.015} />
        <SeaShell/>

        {/*  buttons */}
        <FloatingTextButton position={[-2, 1.5, 0]} label="About Me" path="/about" />
        <FloatingTextButton position={[0, 1.5, 0]} label="Portfolio" path="/portfolio" />
       
        {/*  floating bio */}
        <FloatingBio />

   

      </Canvas>
    </div>
    </>
  );
}
