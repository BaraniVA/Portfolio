import { knowledgeBase, Document } from './knowledgeBase';

// Improved relevance search with category boosts and better matching
const findRelevantDocuments = (query: string): Document[] => {
  const normalizedQuery = query.toLowerCase().trim();
  const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 2);
  
  // Detect specific category intents
  const categoryDetection = {
    project: ['project', 'projects', 'build', 'built', 'created', 'app', 'application', 'website', 'tracker', 'budget'],
    resume: ['experience', 'job', 'work', 'worked', 'company', 'role', 'position', 'education', 'school', 'degree', 'college', 'university'],
    skill: ['skill', 'skills', 'technology', 'tech', 'framework', 'language', 'programming', 'code', 'coding', 'software'],
    blog: ['blog', 'article', 'post', 'wrote', 'write', 'writing'],
    'open-source': ['open source', 'opensource', 'contribution', 'github', 'repository', 'repo']
  };
  
  // Determine if query is specifically about a category
  let targetCategory: string | null = null;
  
  // Check for specific project names
  if (normalizedQuery.includes('budget') || normalizedQuery.includes('tracker')) {
    targetCategory = 'project';
  } else {
    // Check for category keywords
    for (const [category, keywords] of Object.entries(categoryDetection)) {
      if (keywords.some(keyword => normalizedQuery.includes(keyword))) {
        targetCategory = category;
        break;
      }
    }
  }
  
  // Score each document based on term matches with improved relevance
  const scoredDocuments = knowledgeBase.map(doc => {
    const text = doc.title.toLowerCase() + " " + doc.text.toLowerCase();
    let score = 0;
    
    // 1. Boost score for category match
    if (targetCategory && doc.category === targetCategory) {
      score += 5;
    }
    
    // 2. Score for exact phrase matches (higher weight)
    if (text.includes(normalizedQuery)) {
      score += 10;
    }
    
    // 3. Score for individual term matches
    queryTerms.forEach(term => {
      if (text.includes(term)) {
        // Give higher weight to terms in title
        if (doc.title.toLowerCase().includes(term)) {
          score += 2;
        } else {
          score += 1;
        }
      }
    });
    
    // 4. Special case for projects like "Budget Tracker"
    if (normalizedQuery.includes('budget') && doc.category === 'project' && 
        (doc.title.toLowerCase().includes('budget') || text.includes('budget'))) {
      score += 15; // Significant boost for budget related projects
    }
    
    return { doc, score };
  });
  
  // Sort by score and return top results
  return scoredDocuments
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0)
    .slice(0, 3)
    .map(item => item.doc);
};

// Response templates based on document category
const generateResponse = (docs: Document[], query: string): { text: string, source?: Document } => {
  // Add greeting detection
  const greetings = ['hi', 'hello', 'hey', 'greetings', 'howdy'];
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check if the query is just a greeting
  if (greetings.includes(normalizedQuery) || 
      greetings.some(greeting => normalizedQuery.startsWith(`${greeting} `))) {
    return {
      text: "Hello! I'm Barani's virtual assistant. How can I help you today? You can ask about Barani's projects, skills, education, or experience."
    };
  }
  
  // Handle specific topic requests even if no document match was found
  if (docs.length === 0) {
    // Project specific fallback
    if (normalizedQuery.includes('project') || 
        normalizedQuery.includes('budget') || 
        normalizedQuery.includes('tracker')) {
      return {
        text: "Barani has built several projects including Budget Tracker, a tool to help manage finances, and this portfolio website showcasing his work. What would you like to know about these projects?"
      };
    }
    
    // Education specific fallback
    if (normalizedQuery.includes('education') || 
        normalizedQuery.includes('degree') || 
        normalizedQuery.includes('university') || 
        normalizedQuery.includes('college')) {
      return {
        text: "Barani has a strong educational background in computer science and software development. Would you like to know more about his degrees or coursework?"
      };
    }
    
    // General fallback
    return {
      text: "I don't have specific information about that. Would you like to ask something about Barani's projects, skills, or experience instead?"
    };
  }
  
  const topDoc = docs[0];
  
  // Check for appointment-related queries
  if (query.toLowerCase().includes('appointment') || 
      query.toLowerCase().includes('meet') || 
      query.toLowerCase().includes('schedule') ||
      query.toLowerCase().includes('book')) {
    return {
      text: "I'd be happy to help you schedule an appointment with Barani. Please provide your name, email, preferred date and time."
    };
  }
  
  // Generate response based on document category
  switch (topDoc.category) {
    case 'resume':
      return {
        text: topDoc.text,
        source: topDoc
      };
      
    case 'project':
      return {
        text: `Regarding ${topDoc.title}: ${topDoc.text}`,
        source: topDoc
      };
      
    case 'skill':
      return {
        text: topDoc.text,
        source: topDoc
      };
      
    case 'blog':
      return {
        text: `From Barani's blog: ${topDoc.text}`,
        source: topDoc
      };
      
    case 'open-source':
      return {
        text: topDoc.text,
        source: topDoc
      };
      
    default:
      return {
        text: topDoc.text,
        source: topDoc
      };
  }
};

// Main search function
export const searchKnowledgeBase = async (query: string) => {
  // Find relevant documents with the improved algorithm
  const relevantDocs = findRelevantDocuments(query);
  
  // Generate response
  return generateResponse(relevantDocs, query);
};