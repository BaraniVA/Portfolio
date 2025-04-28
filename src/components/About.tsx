import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeIn, fadeInUp } from '../utils/animations';
import { education } from '../data/resumeData';
import { Zap, Globe, BookOpen, Rocket, Coffee } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const statsItems = [
    { icon: <Zap size={24} />, value: 'High', label: 'Creative Voltage' },
    { icon: <Globe size={24} />, value: 'Global', label: 'Impact through Code' },
    { icon: <BookOpen size={24} />, value: 'Always', label: 'Learning Mode' },
    { icon: <Rocket size={24} />, value: 'Ready', label: 'Next Big Mission' },  
    { icon: <Coffee size={24} />, value: '∞', label: 'Late Nights & Ideas Brewed' },  
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get to know more about my journey, skills, and passion for creating amazing digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Personal Info */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Story</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Hey! I’m a passionate computer science graduate constantly on the lookout for the next challenge. With a love for coding that goes beyond just writing lines of code, I’m driven by the idea of creating meaningful solutions that truly make a difference.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Right now, I’m deep into my Master’s in Computer Science, building everything from AI-driven platforms to custom programming languages. I’ve got hands-on experience tackling real-world problems and contributing to open-source projects that fuel my growth. I’m the kind of developer who thrives on experimenting, learning, and pushing the boundaries of what’s possible.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When I’m not immersed in code, you’ll find me exploring new ideas, staying curious about emerging technologies, and always seeking ways to improve. I’m not just about building things, I’m about building the future.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If you’re up for innovative ideas and groundbreaking solutions, let’s make it happen!
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              {statsItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="mb-2 text-blue-600 dark:text-blue-400">{item.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-center">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Education</h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:bg-blue-600 dark:before:bg-blue-400 before:rounded-full before:z-10 after:content-[''] after:absolute after:left-2 after:top-6 after:bottom-0 after:w-0.5 after:bg-gray-200 dark:after:bg-gray-700 last:after:hidden"
                >
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-medium">
                    {edu.institution}, {edu.location}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 mb-2">
                    {edu.startYear} - {edu.endYear}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What I Do</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-3">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Develop responsive and accessible web applications</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Create clean, maintainable, and efficient code</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Design intuitive user interfaces and experiences</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Collaborate with cross-functional teams to deliver solutions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Contribute to open-source projects and the developer community</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;