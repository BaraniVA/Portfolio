import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import * as tf from '@tensorflow/tfjs';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import LayerPalette from './LayerPalette';
import DatasetSelector from './DatasetSelector';
import { useModelStore } from './store';
import ModelSummary from './ModelSummary';

// Register Chart.js components
Chart.register(...registerables);

// Valid TensorFlow.js activation types
type ActivationType = 'relu' | 'sigmoid' | 'softmax' | 'tanh';

const NeuralNetBuilder: React.FC = () => {
  const { layers, addLayer, reorderLayers, clearLayers } = useModelStore();
  const [training, setTraining] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [loss, setLoss] = useState(0);
  const [history, setHistory] = useState<{accuracy: number[], loss: number[]}>({
    accuracy: [],
    loss: []
  });
  const [dataset, setDataset] = useState<'xor' | 'spiral' | 'mnist'>('xor');
  const [prediction, setPrediction] = useState<number[]>([]);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    if (result.source.droppableId === 'layer-palette' && 
        result.destination.droppableId === 'model-canvas') {
      // Pass the entire draggableId which contains both type and params
      addLayer(result.draggableId);
    } else if (result.source.droppableId === 'model-canvas' && 
               result.destination.droppableId === 'model-canvas') {
      // Reorder within the model canvas
      reorderLayers(
        result.source.index,
        result.destination.index
      );
    }
  };

  const trainModel = async () => {
    if (layers.length === 0) return;
    
    setTraining(true);
    setHistory({ accuracy: [], loss: [] });
    
    try {
      // Build model architecture from layers
      const model = tf.sequential();
      
      // Add input layer
      model.add(tf.layers.dense({ 
        inputShape: [2], 
        units: 8, 
        activation: 'relu' as const
      }));
      
      // Add user-defined layers
      layers.forEach(layer => {
        if (layer.type === 'dense') {
          model.add(tf.layers.dense({ 
            units: layer.units || 8,
            activation: (layer.activation || 'relu') as ActivationType
          }));
        } else if (layer.type === 'activation') {
          model.add(tf.layers.activation({ 
            activation: (layer.activation || 'relu') as ActivationType
          }));
        } else if (layer.type === 'dropout') {
          model.add(tf.layers.dropout({ rate: layer.rate || 0.2 }));
        }
      });
      
      // Add output layer
      model.add(tf.layers.dense({ 
        units: 1, 
        activation: 'sigmoid' as const
      }));
      
      // Compile the model
      model.compile({ 
        optimizer: 'adam', 
        loss: 'binaryCrossentropy', 
        metrics: ['accuracy'] 
      });
      
      // Create XOR dataset
      const xs = tf.tensor2d([[0,0], [0,1], [1,0], [1,1]]);
      const ys = tf.tensor2d([[0], [1], [1], [0]]);
      
      // Train the model
      await model.fit(xs, ys, {
        epochs: 50,
        batchSize: 4,
        callbacks: {
          onEpochEnd: (_epoch, logs) => {
            if (logs) {
              setAccuracy(logs.acc);
              setLoss(logs.loss);
              setHistory(prev => ({
                accuracy: [...prev.accuracy, logs.acc],
                loss: [...prev.loss, logs.loss]
              }));
            }
          }
        }
      });
      
      // Make predictions
      const predictions = model.predict(xs) as tf.Tensor;
      const predArray = await predictions.array() as number[][];
      setPrediction(predArray.map(p => p[0]));
      
    } catch (error) {
      console.error('Training error:', error);
    } finally {
      setTraining(false);
    }
  };

  const getPerformanceEmoji = () => {
    if (accuracy > 0.95) return '🧠🔥';
    if (accuracy > 0.8) return '🧠👍';
    if (accuracy > 0.6) return '🧠😐';
    return '🧠💤';
  };

  const chartData = {
    labels: Array.from({ length: history.accuracy.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Accuracy',
        data: history.accuracy,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Loss',
        data: history.loss,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Layer Palette */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Layer Palette</h2>
          <LayerPalette />
          
          {/* Dataset selector */}
          <div className="mt-6">
            <DatasetSelector 
              dataset={dataset} 
              onChange={setDataset} 
            />
          </div>
        </div>

        {/* Model Canvas */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Model Canvas</h2>
          <Droppable droppableId="model-canvas">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[300px] bg-gray-700 rounded-lg p-3"
              >
                {layers.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Drag layers here to build your model
                  </div>
                ) : (
                  <>
                    <div className="bg-blue-900 mb-2 p-2 rounded">
                      Input (2)
                    </div>
                    {layers.map((layer, index) => (
                      <Draggable 
                        key={layer.id} 
                        draggableId={layer.id} 
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-indigo-700 mb-2 p-2 rounded"
                          >
                            {layer.type === 'dense' ? (
                              `Dense (${layer.units || '?'}) ${layer.activation ? `+ ${layer.activation}` : ''}`
                            ) : layer.type === 'activation' ? (
                              `Activation: ${layer.activation || 'unknown'}`
                            ) : (
                              `Dropout (${layer.rate || '?'})`
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    <div className="bg-green-700 p-2 rounded">
                      Output (1) + Sigmoid
                    </div>
                  </>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          
          <div className="mt-4 flex gap-2">
  <button 
    onClick={trainModel} 
    disabled={training || layers.length === 0}
    className="bg-indigo-600 px-4 py-2 rounded disabled:opacity-50"
  >
    {training ? 'Training...' : 'Train Model'}
  </button>
  <button 
    onClick={() => setIsSummaryVisible(true)}
    className="bg-green-600 px-4 py-2 rounded flex items-center gap-1"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 112 0v3a1 1 0 11-2 0v-3zm1-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
    </svg>
    Get Summary
  </button>
  <button 
    onClick={clearLayers}
    className="bg-red-600 px-4 py-2 rounded"
  >
    Clear
  </button>
</div>
        </div>

        {/* Results Panel */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Results {getPerformanceEmoji()}</h2>
          
          {history.accuracy.length > 0 ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Accuracy:</span>
                  <span className={accuracy > 0.9 ? "text-green-400" : "text-yellow-400"}>
                    {(accuracy * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Loss:</span>
                  <span>{loss.toFixed(4)}</span>
                </div>
              </div>
              
              <div className="h-40 mb-4">
                <Line data={chartData} options={{ maintainAspectRatio: false }} />
              </div>
              
              {accuracy > 0.9 && (
                <div className="bg-green-900 p-3 rounded text-sm">
                  Your net has learned XOR. Welcome to 1959! 🎉
                </div>
              )}
              
              {prediction.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-bold mb-2">Predictions:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-700 p-2 rounded">
                      <div>Input: [0,0]</div>
                      <div>Expected: 0</div>
                      <div>Predicted: {prediction[0].toFixed(3)}</div>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <div>Input: [0,1]</div>
                      <div>Expected: 1</div>
                      <div>Predicted: {prediction[1].toFixed(3)}</div>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <div>Input: [1,0]</div>
                      <div>Expected: 1</div>
                      <div>Predicted: {prediction[2].toFixed(3)}</div>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <div>Input: [1,1]</div>
                      <div>Expected: 0</div>
                      <div>Predicted: {prediction[3].toFixed(3)}</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-400">
              Train your model to see results
            </div>
          )}
        </div>
      </DragDropContext>
      
      {/* Model Summary Modal */}
      <ModelSummary 
        isVisible={isSummaryVisible} 
        onClose={() => setIsSummaryVisible(false)} 
      />
    </div>
  );
};

export default NeuralNetBuilder;