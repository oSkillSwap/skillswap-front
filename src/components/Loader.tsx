import { AnimatePresence, motion } from 'motion/react';
import './Loader.scss';

export default function Loader({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/img/skillswap-icon-round-dark.svg" alt="Chargement..." />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
