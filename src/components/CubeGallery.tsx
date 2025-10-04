import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import crush1 from '@/assets/crush-1.jpeg';
import crush2 from '@/assets/crush-2.jpeg';
import crush3 from '@/assets/crush-3.jpeg';
import crush4 from '@/assets/crush-4.jpeg';

const images = [crush1, crush2, crush3, crush4];

interface CubeProps {
  position: [number, number, number];
  image: string;
}

const RotatingCube = ({ position, image }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Auto-rotate the cube smoothly in all directions
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  const textureLoader = new THREE.TextureLoader();
  const imageTexture = textureLoader.load(image);

  // All 6 sides use the same image
  const materials = Array(6).fill(null).map(() => 
    new THREE.MeshStandardMaterial({ 
      map: imageTexture,
      emissive: new THREE.Color('#FF69B4'),
      emissiveIntensity: 0.2,
    })
  );

  return (
    <mesh
      ref={meshRef}
      position={position}
      material={materials}
    >
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  );
};

export const CubeGallery = () => {
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
          Floating Memories
        </h2>
        <p className="text-xl text-muted-foreground">
          Watch the cubes spin in magical space ✨
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full h-[600px] rounded-2xl overflow-hidden glow-box hover:shadow-[0_0_50px_hsl(var(--glow-pink)/0.5)] transition-shadow duration-500"
      >
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#FF69B4" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#E6E6FA" />
          <pointLight position={[0, 10, 5]} intensity={1} color="#87CEEB" />
          <spotLight position={[0, 5, 5]} intensity={1.5} color="#FFB6C1" />

          <RotatingCube position={[-3, 1.5, 0]} image={images[0]} />
          <RotatingCube position={[3, 1.5, 0]} image={images[1]} />
          <RotatingCube position={[-3, -1.5, 0]} image={images[2]} />
          <RotatingCube position={[3, -1.5, 0]} image={images[3]} />
          
          {/* Background glow sphere */}
          <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[4, 32, 32]} />
            <meshBasicMaterial 
              color="#E6E6FA" 
              transparent 
              opacity={0.05}
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
          💫 Floating in a dreamy dimension 💫
        </p>
      </motion.div>
    </section>
  );
};
