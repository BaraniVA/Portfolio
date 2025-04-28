export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  category: 'web' | 'mobile' | 'games' | 'other';
}

export interface OpenSourceContribution {
  id: string;
  title: string;
  organization: string;
  description: string;
  date: string;
  url: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'fundamentals' | 'tools';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  description?: string;
}


