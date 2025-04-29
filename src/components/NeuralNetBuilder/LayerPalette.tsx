import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const LAYER_ITEMS = [
  { id: 'dense-4', type: 'dense', label: 'Dense (4)', units: 4 },
  { id: 'dense-8', type: 'dense', label: 'Dense (8)', units: 8 },
  { id: 'dense-16', type: 'dense', label: 'Dense (16)', units: 16 },
  { id: 'activation-relu', type: 'activation', label: 'ReLU', activation: 'relu' },
  { id: 'activation-sigmoid', type: 'activation', label: 'Sigmoid', activation: 'sigmoid' },
  { id: 'activation-softmax', type: 'activation', label: 'Softmax', activation: 'softmax' },
  { id: 'dropout-0.2', type: 'dropout', label: 'Dropout (0.2)', rate: 0.2 },
];

const LayerPalette: React.FC = () => {
  return (
    <Droppable droppableId="layer-palette" isDropDisabled={true}>
      {(provided) => (
        <div 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          className="grid gap-2"
        >
          {LAYER_ITEMS.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-gray-700 p-3 rounded cursor-move hover:bg-gray-600 transition"
                >
                  {item.label}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default LayerPalette;