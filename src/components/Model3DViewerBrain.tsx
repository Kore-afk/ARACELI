import { Suspense, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

export function Model3DViewerBrain({ title, onClose }: { title: string, onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleContextLost = (event: WebGLContextEvent) => {
      event.preventDefault();
      console.warn('WebGL context was lost.');
    };

    const handleContextRestored = () => {
      console.log('WebGL context was restored.');
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost as EventListener);
      canvas.addEventListener('webglcontextrestored', handleContextRestored as EventListener);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost as EventListener);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored as EventListener);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <motion.div className="bg-white rounded-lg p-4 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
            <Canvas
              ref={canvasRef}
              camera={{ position: [0, 0, 10], fov: 2 }} // Ajusta la posición y el campo de visión (fov) de la cámara
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 10, 5]} intensity={1} />
              <Suspense fallback={null}>
                <Model path="/modelos/Brain.gltf" />
              </Suspense>
              <OrbitControls
                enableZoom={true}
                minDistance={5} // Distancia mínima de zoom
                maxDistance={20} // Distancia máxima de zoom
                target={[0, 0.25, 0]} // Punto al que la cámara está mirando
              />
            </Canvas>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}