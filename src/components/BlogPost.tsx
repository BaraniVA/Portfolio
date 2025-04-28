import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { fadeIn } from '../utils/animations';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [postContent, setPostContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Current slug:", slug);
        
        // Map the slug to the actual filename
        let filename = '';
        if (slug === 'Building-ZeroInput-Creating-an-AI-Productivity-Assistant-That-Learns-From-You') {
          filename = 'Building ZeroInput- Creating an AI Productivity Assistant That Learns From You.md';
        } else {
          // For future posts, add more mappings here
          filename = `${slug}.md`;
        }
        
        console.log("Fetching file:", filename);
        const response = await fetch(`/blogs/${filename}`);
        
        if (!response.ok) {
          console.error("Failed to fetch post:", response.status, response.statusText);
          throw new Error('Failed to fetch blog post');
        }
        
        const content = await response.text();
        setPostContent(content);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load the blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 container mx-auto px-4">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Link to="/blog" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6 mt-10">
            <ArrowLeft size={18} className="mr-1" />
            Back to all posts
          </Link>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 space-x-4">
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                April 29, 2025
              </span>
              <span className="flex items-center">
                <Clock size={16} className="mr-1" />
                8 min read
              </span>
            </div>
            
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>
                {postContent.replace(/^Awesome.*professional post:\n\n---/, '')}
              </ReactMarkdown>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPost;