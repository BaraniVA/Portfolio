import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { openSourceContributions } from '../data/openSourceData';
import { fadeIn, slideInFromLeft, slideInFromRight } from '../utils/animations';
import { GitPullRequest, Heart } from 'lucide-react';

const OpenSource = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="open-source" ref={ref} className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Open Source Contributions</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I believe in giving back to the community. Here are some of my contributions to open source projects, including Hacktoberfest and GirlScript.
          </p>
        </motion.div>

        {/* Contribution Timeline */}
        <div className="max-w-4xl mx-auto">
          {openSourceContributions.map((contribution, index) => {
            const isEven = index % 2 === 0;
            const animationVariant = isEven ? slideInFromLeft : slideInFromRight;

            return (
              <motion.div
                key={contribution.id}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={animationVariant}
                className={`flex items-center mb-12 last:mb-0 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="hidden md:flex flex-col items-center mx-8">
                  <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                  <div className="h-24 w-0.5 bg-blue-600/20 dark:bg-blue-400/20 my-2"></div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2">
                      {contribution.date}
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {contribution.organization}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <GitPullRequest size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                    {contribution.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {contribution.description}
                  </p>

                  <a
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Contribution
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16 max-w-2xl mx-auto p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
        >
          <Heart size={32} className="mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Interested in Collaborating?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-5">
            I'm always looking for interesting open source projects to contribute to. If you're working on something cool, let's connect!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSource;