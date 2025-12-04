import { motion } from 'framer-motion';
import { RobotScene } from './RobotScene';

/**
 * Global UFO that flies across all pages
 * Fixed position, appears on top of all content
 * Disintegrates after 45 seconds
 */
export function UFOScene() {
  return (
    <motion.div 
      className="fixed inset-0 z-40"
      initial={{ opacity: 0, scale: 1, filter: 'blur(0px)' }}
      animate={{ 
        opacity: [0, 0.35, 0.35, 0.2, 0],
        scale: [1, 1, 1, 1.3, 1.5],
        filter: ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(8px)', 'blur(20px)']
      }}
      transition={{ 
        duration: 48,
        times: [0, 0.02, 0.94, 0.97, 1],
        ease: [0.4, 0, 0.6, 1]
      }}
      style={{ pointerEvents: 'none' }}
    >
      <RobotScene size={0.6} autoRotate={false} className="w-full h-full" />
    </motion.div>
  );
}
