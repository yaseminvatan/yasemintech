// Inside src/pages/Portfolio.jsx
import { Canvas } from '@react-three/fiber';
import { Float, Html, OrbitControls, Stars } from '@react-three/drei';
import '../assets/Underwater.css'; // reuse for background styling
import { RandomShootingStars } from '../components/RandomShootingStars';
import Navbar from '../components/Navbar';
function ProjectCard({ position, name, description, github }) {
  return (
    <Float position={position} floatIntensity={1.5} rotationIntensity={1}>
      <Html center distanceFactor={10}>
        <div className="project-card">
          <h3>{name}</h3>
          <p>{description}</p>
          <h3>hover this to see the universe</h3>
          <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </Html>
    </Float>
  );
}

export default function Portfolio() {
  return (
    <>
    <Navbar></Navbar>
    <div className="underwater-container">
      <h2 className="project-card">This webside is under constraction, <br/> <br/> Make a wish!</h2>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <RandomShootingStars/>
        <OrbitControls enableZoom={false} />

        <ProjectCard
          position={[-1.5, 0, 0]}
          name=""
          description=""
          github="https://github.com/UCBX-2024-Team-Wombat/Skill-Share-Hub"
        />
        {/* Add more cards here */}
      </Canvas>
    </div>
    </>
  );
}
