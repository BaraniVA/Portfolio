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
          </Routes>
          <Footer />
          <ScrollToTop />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;