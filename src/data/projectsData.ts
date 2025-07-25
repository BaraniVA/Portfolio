import { Project } from '../types';
import missionComplete from '../assets/images/mission_complete.png'
import budgetTracker from '../assets/images/budget_tracker.png'
import photoBooth from '../assets/images/photo.png'
import Abbot from '../assets/images/Abbott.png'
import JobConnectAI from '../assets/images/JCAI.jpg'
import zeroInputImage from '../assets/images/zeroinput.jpg'


export const projects: Project[] = [
  {
    id: '1',
    title: 'Mission Complete',
    description: 'A Severance-Inspired Task Manager A hyper-focused, mildly terrifying task system where efficiency is mandatory and breaks must be earned. Featuring a rigid corporate structure, cryptic messaging, eerie UI, and constant performance monitoring, because someone is always watching. ACCESS GRANTED. Proceed with purpose. 🚀',
    technologies: ['TypeScript', 'JavaScript'],
    imageUrl: missionComplete,
    liveUrl: 'https://dapper-jelly-420abd.netlify.app/',
    githubUrl: 'https://github.com/BaraniVA/Mission-Complete',
    category: 'web'
  },
  {
    id: '2',
    title: 'Budget Tracker',
    description: 'BudgetTracker is a robust and user-friendly application designed to help you manage and track your expenses and income effectively. Built primarily with TypeScript, it aims to provide a seamless experience for users to stay on top of their financial goals.',
    technologies: ['TypeScript','JavaScript','HTML','CSS'],
    imageUrl: budgetTracker,
    liveUrl: 'https://scintillating-cannoli-3efdc8.netlify.app/',
    githubUrl: 'https://github.com/BaraniVA/BudgetTracker',
    category: 'web'
  },
  {
    id: '3',
    title: 'Photo Booth App',
    description: 'PhotoBooth is a web application built with TypeScript, CSS, JavaScript, and HTML that allows users to take and edit photos.',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    imageUrl: photoBooth,
    liveUrl: 'https://effortless-cassata-feaa5c.netlify.app/',
    githubUrl: 'https://github.com/yourusername/healthapp',
    category: 'web'
  },
  {
    id: '4',
    title: 'Budget Quest',
    description: 'A school budget management simulation game where you take on the role of a principal managing school finances, responding to teacher requests, and handling crisis events.',
    technologies: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    imageUrl: Abbot,
    liveUrl: 'https://sparkling-eclair-803fb3.netlify.app/',
    githubUrl: 'https://github.com/BaraniVA/Abbott',
    category: 'games'
  },
  {
    id: '5',
    title: 'AI-Powered Job Search',
    description: 'JobConnect AI is a multilingual job search platform focused on worker safety. In this project, we have integrated advanced AI and location services to help users discover safe job opportunities while providing essential worker rights and safety tips in multiple languages.',
    technologies: ['TypeScript',
      'JavaScript',
      'Kotlin',
      'Objective-C++',
      'Ruby',
      'Objective-C'],
    imageUrl: JobConnectAI,
    liveUrl: '',
    githubUrl: 'https://github.com/BaraniVA/JobConnectAI',
    category: 'mobile'
  },
  {
    id: '6',
    title: 'ZeroInput',
    description: 'ZeroInput is a privacy-first, intelligent workflow assistant for Windows that learns how you use your computer—then proactively suggests helpful actions. Powered by a neural network and local language models, it adapts to your habits and context to boost productivity with smart, on-device automation.',
    technologies: ['Python', 'Neural Networks', 'Windows APIs'],
    imageUrl: zeroInputImage, 
    liveUrl: '', 
    githubUrl: 'https://github.com/BaraniVA/ZeroInput', 
    category: 'other' 
  }
];