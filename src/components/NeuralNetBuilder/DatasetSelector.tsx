import React from 'react';

interface Props {
  dataset: string;
  onChange: (dataset: 'xor' | 'spiral' | 'mnist') => void;
}

const DatasetSelector: React.FC<Props> = ({ dataset, onChange }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Dataset</h3>
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded ${dataset === 'xor' ? 'bg-indigo-600' : 'bg-gray-600'}`}
          onClick={() => onChange('xor')}
        >
          XOR
        </button>
        <button
          className={`px-3 py-1 rounded ${dataset === 'spiral' ? 'bg-indigo-600' : 'bg-gray-600'}`}
          onClick={() => onChange('spiral')}
          disabled
        >
          Spiral (Coming Soon)
        </button>
        <button
          className={`px-3 py-1 rounded ${dataset === 'mnist' ? 'bg-indigo-600' : 'bg-gray-600'}`}
          onClick={() => onChange('mnist')}
          disabled
        >
          MNIST (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default DatasetSelector;