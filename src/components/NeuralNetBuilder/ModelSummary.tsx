import React from 'react';
import { useModelStore } from './store';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const ModelSummary: React.FC<Props> = ({ isVisible, onClose }) => {
  const layers = useModelStore((state) => state.layers);
  
  if (!isVisible) return null;
  
  // Generate simple descriptions for each layer
  const layerDescriptions = layers.map((layer, index) => {
    switch (layer.type) {
      case 'dense':
        return `Layer ${index + 1}: A Dense layer with ${layer.units} neurons. This layer helps the network learn complex patterns by connecting all inputs to all outputs.`;
      case 'activation':
        return `Layer ${index + 1}: An ${layer.activation} activation function. ${getActivationDescription(layer.activation)}`;
      case 'dropout':
        return `Layer ${index + 1}: A Dropout layer with rate ${layer.rate}. This helps prevent overfitting by randomly turning off ${layer.rate ? layer.rate * 100 : 0}% of neurons during training.`;
      default:
        return '';
    }
  });
  
  // Get model complexity and capabilities
  const denseLayerCount = layers.filter(l => l.type === 'dense').length;
  const totalNeurons = layers
    .filter(l => l.type === 'dense')
    .reduce((sum, layer) => sum + (layer.units || 0), 0);
  
  const hasDropout = layers.some(l => l.type === 'dropout');
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-400">Neural Network Summary</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {layers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Your neural network doesn't have any layers yet. Try adding some layers to get a summary!</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-indigo-300">Overview</h3>
                <p className="text-gray-300">
                  You've built a neural network with {layers.length} layers, including {denseLayerCount} computation layers with a total of {totalNeurons} neurons.
                  {hasDropout ? " Your model includes dropout, which helps prevent overfitting." : ""}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-indigo-300">Layer by Layer Explanation</h3>
                <div className="space-y-4">
                  {layerDescriptions.map((desc, idx) => (
                    <div key={idx} className="bg-gray-700 p-4 rounded-md">
                      {desc}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-300">Potential Use Cases</h3>
                <p className="text-gray-300 mb-3">
                  {getPotentialUseCases(layers)}
                </p>
                
                <div className="mt-4 p-4 border border-indigo-500 rounded-md bg-indigo-900 bg-opacity-40">
                  <h4 className="font-semibold text-indigo-300 mb-2">💡 Learning Point</h4>
                  <p className="text-gray-300">
                    {getLearningPoint(layers)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to describe activation functions
function getActivationDescription(activation?: string): string {
  switch (activation) {
    case 'relu':
      return 'ReLU (Rectified Linear Unit) allows only positive values to pass through, helping the network learn non-linear patterns.';
    case 'sigmoid':
      return 'Sigmoid squishes values between 0 and 1, useful for binary classification problems.';
    case 'softmax':
      return 'Softmax converts values into probabilities that sum to 1, making it ideal for multi-class classification.';
    default:
      return '';
  }
}

// Helper function to suggest potential use cases based on network structure
function getPotentialUseCases(layers: any[]): string {
  const hasSoftmax = layers.some(l => l.type === 'activation' && l.activation === 'softmax');
  const hasSigmoid = layers.some(l => l.type === 'activation' && l.activation === 'sigmoid');
  const denseLayerCount = layers.filter(l => l.type === 'dense').length;
  
  if (hasSoftmax) {
    return 'This network architecture could be suitable for multi-class classification problems like image recognition, text categorization, or identifying multiple categories.';
  } else if (hasSigmoid) {
    return 'This network structure looks appropriate for binary classification tasks like spam detection, sentiment analysis, or yes/no predictions.';
  } else if (denseLayerCount >= 3) {
    return 'Your deep neural network with multiple layers could be good for complex pattern recognition or regression tasks that require understanding intricate relationships in data.';
  } else {
    return 'This simple neural network could be used for basic pattern recognition or simple regression tasks.';
  }
}

// Helper function to provide educational insights based on the model structure
function getLearningPoint(layers: any[]): string {
  const activationTypes = layers
    .filter(l => l.type === 'activation')
    .map(l => l.activation);
  
  if (activationTypes.includes('relu') && activationTypes.includes('softmax')) {
    return "Using ReLU in hidden layers with Softmax in the output layer is a common pattern in classification networks. ReLU helps avoid the 'vanishing gradient problem' in deep networks, while Softmax ensures your outputs represent probabilities across classes.";
  } else if (layers.some(l => l.type === 'dropout')) {
    return "Dropout is a powerful regularization technique that helps prevent overfitting. During training, it randomly 'drops' neurons, forcing the network to learn more robust features that don't depend on specific neurons.";
  } else if (layers.filter(l => l.type === 'dense').length > 3) {
    return "Deep networks with many layers can learn hierarchical features - early layers detect simple patterns, while deeper layers combine these into complex concepts. However, deeper isn't always better - each problem has an optimal depth!";
  } else {
    return "Neural networks learn by adjusting weights between neurons. The more you train, the better these weights become at transforming inputs into correct outputs. This is similar to how our brains strengthen connections through practice.";
  }
}

export default ModelSummary;