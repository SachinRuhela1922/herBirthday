import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import crush1 from '@/assets/crush-1.jpeg';
import crush2 from '@/assets/crush-2.jpeg';
import crush3 from '@/assets/crush-3.jpeg';
import crush4 from '@/assets/crush-4.jpeg';
import crush5 from '@/assets/crush-5.jpeg';
import crush6 from '@/assets/crush-6.jpeg';

const images = [crush1, crush2, crush3, crush4, crush5, crush6];

const Hexagon = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [scattered, setScattered] = useState(false);
  const sidesRef = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.3;
    }

    if (scattered && sidesRef.current.length > 0) {
      sidesRef.current.forEach((side, index) => {
        if (side) {
          const angle = (index / 6) * Math.PI * 2;
          const targetX = Math.cos(angle) * 4;
          const targetZ = Math.sin(angle) * 4;
          
          side.position.x += (targetX - side.position.x) * delta * 2;
          side.position.z += (targetZ - side.position.z) * delta * 2;
          side.rotation.y += delta * 2;
        }
      });
    } else if (!scattered && sidesRef.current.length > 0) {
      sidesRef.current.forEach((side, index) => {
        if (side) {
          const angle = (index / 6) * Math.PI * 2;
          const targetX = Math.cos(angle) * 1.5;
          const targetZ = Math.sin(angle) * 1.5;
          
          side.position.x += (targetX - side.position.x) * delta * 3;
          side.position.z += (targetZ - side.position.z) * delta * 3;
          side.rotation.y += (angle - side.rotation.y) * delta * 2;
        }
      });
    }
  });

  const handlePointerEnter = () => {
    setHovered(true);
    setScattered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setTimeout(() => setScattered(false), 500);
  };

  const createHexagonSide = (index: number) => {
    const angle = (index / 6) * Math.PI * 2;
    const x = Math.cos(angle) * 1.5;
    const z = Math.sin(angle) * 1.5;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(images[index]);

    return (
      <mesh
        key={index}
        ref={(el) => {
          if (el) sidesRef.current[index] = el;
        }}
        position={[x, 0, z]}
        rotation={[0, angle, 0]}
      >
        <planeGeometry args={[2.5, 3]} />
        <meshStandardMaterial 
          map={texture}
          side={THREE.DoubleSide}
          emissive="#FF69B4"
          emissiveIntensity={hovered ? 0.2 : 0}
          transparent={false}
          opacity={1}
        />
      </mesh>
    );
  };

  return (
    <group
      ref={groupRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => createHexagonSide(i))}
      
      {/* Particle effects when scattered */}
      {scattered && (
        <>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh
              key={`particle-${i}`}
              position={[
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
              ]}
            >
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial color="#FF69B4" />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
};

export const HexagonShowcase = () => {
  return (
    <section className="min-h-screen py-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl md:text-7xl font-dancing gradient-text mb-4">
          3D Memory Hexagon
        </h2>
        <p className="text-xl text-muted-foreground">
          Hover to scatter and explore beautiful moments ✨
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full h-[700px] rounded-2xl overflow-hidden glow-box"
      >
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <OrbitControls 
            enableZoom={true}
            minDistance={5}
            maxDistance={15}
            autoRotate={false}
          />
          
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#FF69B4" />
          <pointLight position={[-5, -5, -5]} intensity={0.8} color="#E6E6FA" />
          <spotLight position={[0, 10, 0]} intensity={1.5} color="#FFB6C1" angle={0.6} />

          <Hexagon />

          {/* Background glow sphere */}
          <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[3, 32, 32]} />
            <meshBasicMaterial 
              color="#E6E6FA" 
              transparent 
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
        </Canvas>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <p className="text-lg text-muted-foreground font-poppins">
          💫 Each side holds a precious memory 💫
        </p>
      </motion.div>
    </section>
  );
};
