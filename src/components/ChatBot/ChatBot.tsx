import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import AppointmentForm from './AppointmentForm';
import { searchKnowledgeBase } from '../../utils/chatbot/similaritySearch';
import { X } from 'lucide-react';

interface ChatBotProps {
  onClose: () => void;
}

type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  source?: {
    title: string;
    id: number;
  };
};

type ChatState = 'chat' | 'appointment';

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      text: "Hi there! I'm Barani's virtual assistant. Ask me anything about Barani's projects, experience, or book an appointment!",
      isUser: false
    }
  ]);
  const [chatState, setChatState] = useState<ChatState>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessageId = Date.now().toString();
    setMessages(prev => [
      ...prev,
      { id: userMessageId, text, isUser: true }
    ]);

    // Check for appointment booking intent
    if (text.toLowerCase().includes('appointment') || 
        text.toLowerCase().includes('schedule') || 
        text.toLowerCase().includes('meet') || 
        text.toLowerCase().includes('book')) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "I'd be happy to help you schedule an appointment with Barani. Please fill out the form below:",
            isUser: false
          }
        ]);
        setChatState('appointment');
      }, 600);
      return;
    }

    // Normal query processing
    try {
      // Search knowledge base
      const result = await searchKnowledgeBase(text);
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: result.text,
            isUser: false,
            source: result.source ? {
              title: result.source.title,
              id: result.source.id
            } : undefined
          }
        ]);
      }, 600);
    } catch (error) {
      console.error('Error searching knowledge base:', error);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "I'm sorry, I couldn't process your request. Please try asking something else about Barani's projects or experience.",
            isUser: false
          }
        ]);
      }, 600);
    }
  };

  const handleAppointmentSubmit = (formData: any) => {
    // Add success message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: `Thanks! Your appointment request for ${formData.date} at ${formData.time} has been sent to Barani. You'll receive a confirmation email shortly.`,
        isUser: false
      }
    ]);
    
    // Return to chat mode
    setChatState('chat');
  };

  const handleBackToChat = () => {
    setChatState('chat');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-blue-600 dark:bg-blue-700 text-white p-4">
        <h3 className="font-bold text-lg">Chat with Barani's Assistant</h3>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message.text} 
            isUser={message.isUser} 
            source={message.source}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {chatState === 'chat' ? (
        <ChatInput onSendMessage={handleSendMessage} />
      ) : (
        <AppointmentForm 
          onSubmit={handleAppointmentSubmit} 
          onCancel={handleBackToChat} 
        />
      )}
    </div>
  );
};

export default ChatBot;