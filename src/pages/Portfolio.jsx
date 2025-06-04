// Inside src/pages/Portfolio.jsx
import { Canvas } from '@react-three/fiber';
import { Float, Html, OrbitControls, Stars } from '@react-three/drei';
import '../assets/Underwater.css'; // reuse for background styling

function ProjectCard({ position, name, description, github }) {
  return (
    <Float position={position} floatIntensity={1.5} rotationIntensity={1}>
      <Html center distanceFactor={10}>
        <div className="project-card">
          <h3>{name}</h3>
          <p>{description}</p>
          <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </Html>
    </Float>
  );
}

export default function Portfolio() {
  return (
    <div className="underwater-container">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <OrbitControls enableZoom={false} />

        <ProjectCard
          position={[-1.5, 0, 0]}
          name="Skill-Share Hub"
          description="MERN-stack platform for learning and sharing skills"
          github="https://github.com/UCBX-2024-Team-Wombat/Skill-Share-Hub"
        />
        {/* Add more cards here */}
      </Canvas>
    </div>
  );
}
