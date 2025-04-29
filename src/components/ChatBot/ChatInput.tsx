import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about Barani..."
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          style={{ height: '40px' }}
        />
        <button
          type="submit"
          className="px-4 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
          aria-label="Send message"
          style={{ height: '40px', minWidth: '40px' }}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;