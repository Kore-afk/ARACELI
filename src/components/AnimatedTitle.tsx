import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  text: string;
}

export function AnimatedTitle({ text }: AnimatedTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
        {text}
      </h1>
    </motion.div>
  );
}