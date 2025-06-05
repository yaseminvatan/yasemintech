import { Canvas, useFrame,useLoader } from '@react-three/fiber';
import { Html, Stars, Float, Trail } from '@react-three/drei';
import '../assets/Underwater.css';
import { useRef } from 'react';
import * as THREE from 'three';
import Navbar from '../components/Navbar';
import { RandomShootingStars } from '../components/RandomShootingStars'
function ShootingStar() {
  const ref = useRef();

  // Start off-screen
  const initialPosition = new THREE.Vector3(-20, 10, -10);
  const velocity = new THREE.Vector3(0.2, -0.1, 0.1); // direction and speed

  useFrame(() => {
    if (ref.current) {
      ref.current.position.add(velocity);

      // Reset if it moves off screen
      if (ref.current.position.x > 20 || ref.current.position.y < -10) {
        ref.current.position.copy(initialPosition);
      }
    }
  });

  return (
    <mesh ref={ref} position={initialPosition}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="white" emissive="white" />
    </mesh>
  );
}
// function MoonStarImage() {
//   const texture = useLoader(THREE.TextureLoader, '/moon-star-yellow.svg');
//   const ref = useRef();

//   return (
//     <mesh ref={ref} position={[4.9, 3.0, 0]}>
//       <planeGeometry args={[0.6, 0.6]} />
//       <meshBasicMaterial map={texture} transparent />
//     </mesh>
//   );
// }

function FloatingBio() {
  const handleClick = (url) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.2} position={[0, -2.8, 0]}>
      <Html center distanceFactor={12}>
        <div className="floating-bio wide">
          <h3>Hello! I'm Yasemin Vatan</h3>
          <p>
            A highly skilled and passionate professional with over 9 years of experience as a GIS Specialist and database expert.
            My career journey has been shaped by my curiosity and dedication to solving complex problems through data and technology.
          </p>
          <h4>Professional Expertise</h4>
          <ul>
            <li><strong>GIS Specialist:</strong> Managed large-scale GIS projects with deep spatial data analysis.</li>
            <li><strong>Full-Stack Development:</strong> JavaScript, React, Node.js, Express, Sequelize, PostgreSQL, and more.</li>
            <li><strong>Leadership:</strong> Former Chief of the Database and GIS Department, focused on collaboration and growth.</li>
          </ul>
          <h4>Personal Adventures</h4>
          <ul>
            <li>🏊‍♀️ <strong>Freediving & Spearfishing:</strong> The ocean teaches me calmness and resilience.</li>
            <li>🥋 <strong>Martial Arts:</strong> 20+ years in Taekwondo as a black belt.</li>
            <li>🚴‍♀️ <strong>Cycling Enthusiast:</strong> Active explorer on tree wheels.</li>
            <li>🐾 <strong>Animal Lover:</strong> Passionate about sustainability and ethical practices.</li>
          </ul>
          <h4>My Philosophy</h4>
          <p>
            I believe life is a continuous learning process. My adventurous spirit and work ethic make me a lifelong learner.
          </p>
          <h4>Let's Connect!</h4>
          <div className="underwater-links">
            <button onClick={() => handleClick('https://github.com/yaseminvatan')}>GitHub</button>
            <button onClick={() => handleClick('https://linkedin.com/in/yaseminvatan')}>LinkedIn</button>
          </div>
        </div>
      </Html>
    </Float>
  );
}
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

function ResumeDownloadButton() {
  return (
    <Html position={[0, 2.6, 0]} center>
      <a
        href="/Yasemin_Vatan_Resume.pdf"
        download
        className="resume-download-btn"
      >
         Resume
      </a>
    </Html>
  );
}

export default function AboutMe() {
  return (
    <>
    <Navbar></Navbar>
    <div className="underwater-container2">
      <h2 className="underwater-title2">About Yasemin</h2>
      <Canvas camera={{ position: [0, 0, 5] }}>
       {/*} <MoonStarImage />*/}
        <ResumeDownloadButton/>
        <RandomShootingStars />
        <ambientLight intensity={0.3} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <FloatingBio />
        <RotatingStars/>
    
      </Canvas>
    </div>

    </>
  );
}