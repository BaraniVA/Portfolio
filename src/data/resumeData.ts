import { Experience, Education } from '../types';

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Digital Marketing Intern',
    company: 'SAASConsult',
    location: 'Chennai, Tamil Nadu',
    startDate: 'June 2023',
    endDate: 'August 2023',
    description: [
      'Assisted in implementing and managing digital marketing campaigns across various social media channels, boosting engagement rates.',
      'Analyzed competitor pages to identify backlink and keyword optimization opportunities.',
      'Utilized Google Workspace tools (Docs, Sheets, Gmail) to enhance team collaboration and communication.',
      'Gained hands-on experience in marketing automation and campaign performance analysis.'
    ]
  },
  {
    id: '2',
    role: 'Open Source Contributor',
    company: 'Hacktoberfest 2024 / GirlScript Summer of Code Extended',
    location: 'Remote',
    startDate: 'March 2024',
    endDate: 'Present',
    description: [
      'Developed a glassmorphic accordion component using TypeScript for an open-source component library.',
      'Implemented search functionality for an open-source e-commerce platform (Icyco) using JavaScript.',
      'Collaborated with global contributors, practiced agile development, and improved codebase quality through peer reviews.',
      'Gained practical experience working with real-world projects and contributing to community-driven initiatives.'
    ]
  },
  {
    id: '3',
    role: 'Student Developer',
    company: 'Personal Projects',
    location: 'Chennai, Tamil Nadu',
    startDate: '2023',
    endDate: 'Present',
    description: [
      'Built JobConnect AI, a voice-accessible mobile platform connecting blue-collar workers to local jobs, using React Native, Firebase, and Gemini AI.',
      'Developed Bart, a custom programming language with a lexer, parser, and REPL in Python, supporting basic arithmetic, conditionals, and loops.',
      'Engineered multilingual support, AI safety analysis, and location-based services to enhance app accessibility and user trust.',
      'Focused on building real-world, user-centric solutions with an emphasis on accessibility, innovation, and ethical AI integration.'
    ]
  },
  {
  id: '4',
  role: 'Mobile App Development Intern',
  company: 'Ramco Cements',
  location: 'Chennai, Tamil Nadu',
  startDate: 'May 2025',
  endDate: 'June 2025',
  description: [
    'Developed comprehensive Android mobile application for MACE division using React Native and Expo framework to digitize engineer conversion tracking processes.',
    'Engineered end-to-end data collection system with structured workflow enabling field engineers to input conversion details and administrators to manage approvals efficiently.',
    'Built automated report generation and analytics dashboard that transforms raw conversion data into actionable business intelligence for management decision-making.',
    'Delivered production-ready solution currently used by engineering teams, streamlining operational processes and improving data accuracy across the division.'
   ]
  },
  {
  id: '5',
  role: 'Python Development Intern',
  company: 'Career Schools HR Solution',
  location: 'Chennai, Tamil Nadu',
  startDate: 'April 2025',
  endDate: 'May 2025',
  description: [
    'Architected ZeroInput intelligent workflow assistant for Windows using neural networks and local language models to analyze user behavior and suggest productivity enhancements.',
    'Implemented privacy-first system architecture ensuring all data processing and machine learning operations remain local to user devices without external data transmission.',
    'Developed context-aware automation features that adapt to individual user patterns and work habits, providing personalized productivity suggestions based on usage analysis.',
    'Built scalable on-device AI solution combining neural network processing with local language models to deliver smart, proactive workflow assistance while maintaining user privacy.'
   ]
  }  
];

export const education: Education[] = [
  {
    id: '1',
    degree: 'Master of Science in Computer Science',
    institution: 'Valliammal College for Women',
    location: 'Chennai, Tamil Nadu',
    startYear: '2024',
    endYear: '2026',
    description: 'Relevant Coursework: Data Structures and Algorithms, Advanced Java, Advanced Python, Machine Learning, Cloud Computing. Actively involved in research projects and seminars to enhance knowledge in emerging technologies.'
  },
  {
    id: '2',
    degree: 'Bachelor of Computer Applications',
    institution: 'Vels University',
    location: 'Chennai, Tamil Nadu',
    startYear: '2021',
    endYear: '2024',
    description: 'Graduated with a GPA of 8.86/10. Strong foundation in programming, databases, and software development. Awarded departmental scholarship for securing 3rd rank.'
  }  
];