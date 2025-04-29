import React from 'react';
import NeuralNetBuilder from '../components/NeuralNetBuilder';
import { useTheme } from '../utils/themeContext';

const Playground: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen pt-16 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-b from-gray-50 to-gray-100 text-white'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mt-10 mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Neural Network Playground</h1>
        <p className={`mb-8 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>Build your own neural network by dragging layers onto the canvas and watch it learn in real-time!</p>
        
        <NeuralNetBuilder />
      </div>
    </div>
  );
};

export default Playground;