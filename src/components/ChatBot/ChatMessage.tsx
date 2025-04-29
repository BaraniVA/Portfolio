import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  source?: {
    title: string;
    id: number;
  };
}

const ChatMessage = ({ message, isUser, source }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        }`}
      >
        <div className="text-sm sm:text-base">{message}</div>
        
        {source && (
          <div className="mt-2 text-xs italic opacity-70">
            Source: {source.title}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;