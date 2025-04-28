import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeIn, fadeInUp } from '../utils/animations';
import { experiences } from '../data/resumeData';
import { skills } from '../data/skillsData';
import { Download, Briefcase } from 'lucide-react';

const Resume = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Category titles for display
  const categoryTitles = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    design: 'Design',
    tools: 'Tools & Technologies'
  };

  return (
    <section id="resume" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Resume & Skills</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A summary of my professional experience, skills, and qualifications.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
          <a
            href="/Resume_I.pdf" // Path to the file inside the public folder
            download="Barani_Anandakumar_Resume.pdf" // Trigger download with a custom name
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
            rel="noopener noreferrer"
          >
            <Download size={18} className="mr-2" />
            Download Resume
          </a>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Briefcase size={24} className="mr-2 text-blue-600 dark:text-blue-400" />
              Work Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:bg-blue-600 dark:before:bg-blue-400 before:rounded-full before:z-10 after:content-[''] after:absolute after:left-2 after:top-6 after:bottom-0 after:w-0.5 after:bg-gray-200 dark:after:bg-gray-700 last:after:hidden"
                >
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">
                    {experience.role}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-medium">
                    {experience.company}, {experience.location}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 mb-2">
                    {experience.startDate} - {experience.endDate}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {experience.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Skills
            </h3>
            
            <div className="space-y-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                >
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {categoryTitles[category as keyof typeof categoryTitles]}
                  </h4>
                  <div className="space-y-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.1 * categoryIndex + 0.05 * skillIndex }}
                            className="h-2.5 rounded-full"
                            style={{
                              background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)'
                            }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;