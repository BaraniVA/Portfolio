import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-blue-400 mb-3">Barani's Portfolio</h3>
            <p className="text-gray-400 max-w-md">
            I'm passionate about crafting beautiful, functional, and accessible digital experiences. Let’s work together to bring your ideas to life.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-center md:text-left">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
                <li><a href="#open-source" className="hover:text-blue-400 transition-colors">Open Source</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">More</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#resume" className="hover:text-blue-400 transition-colors">Resume</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="/blog" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} Barani V A. All rights reserved.
          </p>
          
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Made with</span>
            <Heart size={16} className="text-blue-500 mr-2" />
            <span className="text-gray-500">using React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;