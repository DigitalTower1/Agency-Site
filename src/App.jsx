import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';

// Componente 3D: Una torre astratta monolitica
const AbstractTower = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Rotazione lenta e premium
    meshRef.current.rotation.y = time * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      {/* Geometria alta e sottile per richiamare la torre */}
      <boxGeometry args={[1.5, 6, 1.5]} />
      {/* Materiale nero lucido (Audace & Premium) */}
      <meshStandardMaterial 
        color="#1a1a1a" 
        roughness={0.1} 
        metalness={0.8} 
      />
    </mesh>
  );
};

const App = () => {
  const titleRef = useRef();
  const taglineRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animazione Audace: Entrata dal basso con reveal
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      });
      
      gsap.from(taglineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.6
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-screen bg-background text-primary font-sans">
      
      {/* Layer 3D */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Environment preset="city" />
          
          <group position={[0, -1, 0]}>
             <AbstractTower />
             <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
          </group>
          
          {/* Controlli disabilitati o limitati per mantenere l'aspetto 'sito vetrina' */}
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </div>

      {/* Layer UI / Contenuto */}
      <main className="ui-container flex flex-col justify-between h-full p-8 md:p-16">
        
        {/* Header / Logo */}
        <header className="flex justify-between items-start">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
            Digital<br />Tower
          </h1>
          <div className="hidden md:block text-sm font-medium tracking-widest uppercase">
            Est. 2026
          </div>
        </header>

        {/* Footer / Tagline */}
        <footer className="flex justify-end items-end">
          <p ref={taglineRef} className="text-xl md:text-2xl font-normal text-right max-w-md leading-tight">
            Scaliamo insieme<br />
            la torre del successo.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default App;
