import { create } from 'zustand';

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

interface Layer {
  id: string;
  type: 'dense' | 'activation' | 'dropout';
  units?: number;
  activation?: string;
  rate?: number;
}

interface ModelState {
  layers: Layer[];
  addLayer: (type: string) => void;
  reorderLayers: (startIndex: number, endIndex: number) => void;
  clearLayers: () => void;
}

export const useModelStore = create<ModelState>((set) => ({
  layers: [],
  
  addLayer: (layerType) => set((state) => {
    const [type, param] = layerType.split('-');
    
    const newLayer: Layer = { // Changed 'let' to 'const'
      id: generateId(), // Using the local ID generator instead of uuid
      type: type as 'dense' | 'activation' | 'dropout', // Explicit type instead of 'any'
    };
    
    if (type === 'dense') {
      newLayer.units = parseInt(param);
    } else if (type === 'activation') {
      newLayer.activation = param;
    } else if (type === 'dropout') {
      newLayer.rate = parseFloat(param);
    }
    
    return { layers: [...state.layers, newLayer] };
  }),
  
  reorderLayers: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.layers);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    return { layers: result };
  }),
  
  clearLayers: () => set({ layers: [] }),
}));