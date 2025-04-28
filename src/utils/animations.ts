export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6 }
  }
};