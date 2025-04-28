import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDownCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-100 dark:bg-purple-900/20 blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Hi, I'm <span className="text-gray-900 dark:text-white">Barani V A</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-8 h-12"
          >
            <TypeAnimation
              sequence={[
                'Software Developer',
                1000,
                'Builder of Human-Centered Experiences',
                1000,
                'Open Source Contributor',
                1000,
                'Problem Solver & Creative Technologist',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            I build innovative solutions, from web apps to custom programming languages and intelligent assistants, all focused on clean code and exceptional user experiences. Let’s create something remarkable!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-lg font-medium"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg text-lg font-medium"
            >
              View My Work
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.2,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <a href="#about" aria-label="Scroll to About section">
          <ArrowDownCircle 
            size={36} 
            className="text-blue-600 dark:text-blue-400" 
          />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;