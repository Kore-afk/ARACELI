import React, { useState } from 'react';
import { ChevronDown, Heart, Sparkles, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { InfoModal } from './InfoModal';
import { Model3DViewerBrain } from '../components/Model3DViewerBrain';
import { Model3DViewerHeart } from '../components/Model3DViewerHeart';
import { Model3DViewerSkeleton } from '../components/Model3DViewerSkeleton';
import { Model3DViewerMuscles } from '../components/Model3DViewerMuscles';

interface BodyPartProps {
  title: string;
  description: string;
  image: string;
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ComponentType<{ className?: string }>;
  careInstructions: string;
  funFacts: string;
}

export function BodyPart({ 
  title, 
  description, 
  image, 
  isOpen, 
  onToggle,
  icon: Icon,
  careInstructions,
  funFacts
}: BodyPartProps) {
  const [showCare, setShowCare] = useState(false);
  const [showFacts, setShowFacts] = useState(false);
  const [show3DModel, setShow3DModel] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl border border-gray-100"
    >
      <div 
        className="flex items-center justify-between p-6 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-white/80" />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full md:w-1/2"
                >
                  <div className="relative group">
                    <img 
                      src={image} 
                      alt={title} 
                      className="w-full rounded-xl object-cover h-[400px] shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
                <div className="flex-1 space-y-6">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-700 leading-relaxed text-lg"
                  >
                    {description}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-4 mt-6"
                  >
                    <Button
                      icon={Heart}
                      label="Cómo Cuidarlo"
                      onClick={() => setShowCare(true)}
                      variant="primary"
                    />
                    <Button
                      icon={Sparkles}
                      label="Datos Curiosos"
                      onClick={() => setShowFacts(true)}
                      variant="secondary"
                    />
                    <Button
                      icon={Activity}
                      label="Ver en 3D"
                      onClick={() => setShow3DModel(true)}
                      variant="outline"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showCare && (
        <InfoModal
          title={`Cómo cuidar tu ${title}`}
          content={careInstructions}
          onClose={() => setShowCare(false)}
        />
      )}

      {showFacts && (
        <InfoModal
          title={`Datos Curiosos sobre el ${title}`}
          content={funFacts}
          onClose={() => setShowFacts(false)}
        />
      )}

      {show3DModel && title === "Cerebro" && (
        <Model3DViewerBrain
          title={title}
          onClose={() => setShow3DModel(false)}
        />
      )}

      {show3DModel && title === "Corazón" && (
        <Model3DViewerHeart
          title={title}
          onClose={() => setShow3DModel(false)}
        />
      )}

      {show3DModel && title === "Esqueleto" && (
        <Model3DViewerSkeleton
          title={title}
          onClose={() => setShow3DModel(false)}
        />
      )}

      {show3DModel && title === "Músculos" && (
        <Model3DViewerMuscles
          title={title}
          onClose={() => setShow3DModel(false)}
        />
      )}
    </motion.div>
  );
}