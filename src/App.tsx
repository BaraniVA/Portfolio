import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './utils/themeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import FloatingChatButton from './components/ChatBot/FloatingChatButton';
import Playground from './pages/Playground';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                <About />
                <Projects />
                <OpenSource />
                <Resume />
                <Contact />
              </main>
            } />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
          <Footer />
          <div className="fixed bottom-4 right-4 z-50">
            <ScrollToTop />
          </div>
          <div className="fixed bottom-4 left-4 z-50">
            <FloatingChatButton />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;