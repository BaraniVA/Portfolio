import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Github, Linkedin } from 'lucide-react';
import { useTheme } from '../utils/themeContext';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/me.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add this useEffect to track window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href: string, isPage: boolean = false) => {
    if (isOpen) {
      setIsOpen(false);
    }
    
    if (isPage) {
      // Direct navigation to a different page
      navigate(href);
    } else if (isHomePage) {
      // Already on home page, just scroll to the section
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On another page, navigate to home page first, then scroll after a delay
      navigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Use a longer timeout to ensure components are rendered
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Open Source', href: '#open-source' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
    { name: 'Playground', href: '/playground', isPage: true },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || isMobile 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 font-bold text-xl text-blue-600 dark:text-blue-400">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center cursor-pointer"
            >
              <div className="w-18 h-8 overflow-hidden rounded-xl">
                <img 
                  src={logoImage} 
                  alt="Barani" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-2">Barani's Portfolio</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block flex-grow">
            <div className="flex items-center justify-center space-x-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.isPage)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md font-medium transition-colors cursor-pointer"
                >
                  {link.name}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Social Links & Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a href="https://github.com/BaraniVA" target="_blank" rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <a href="https://www.linkedin.com/in/barani-a-90716422a" target="_blank" rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
            </motion.div>
            <motion.button
              onClick={toggleTheme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <div
              key={link.name}
              onClick={() => handleNavClick(link.href, link.isPage)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {link.name}
            </div>
          ))}
          <div className="flex space-x-4 px-3 py-2">
            <a href="https://github.com/BaraniVA" target="_blank" rel="noopener noreferrer" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/barani-a-90716422a" target="_blank" rel="noopener noreferrer" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;