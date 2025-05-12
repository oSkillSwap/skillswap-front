import { easeInOut, motion } from 'motion/react';

const PageTransition = (PageComponent: React.ComponentType) => {
  return () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: easeInOut }}
    >
      <PageComponent />
    </motion.div>
  );
};

export default PageTransition;
