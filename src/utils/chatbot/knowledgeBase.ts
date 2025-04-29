import { experiences, education } from '../../data/resumeData';
import { projects } from '../../data/projectsData';
import { openSourceContributions } from '../../data/openSourceData';
import { skills } from '../../data/skillsData';
import { blogPosts } from '../../data/blogData';

// Define document structure
export interface Document {
  id: number;
  title: string;
  text: string;
  category: 'resume' | 'project' | 'skill' | 'blog' | 'open-source';
}

// Process existing data into searchable documents
export const createKnowledgeBase = (): Document[] => {
  const documents: Document[] = [];
  let id = 1;

  // Resume experiences
  experiences.forEach(exp => {
    documents.push({
      id: id++,
      title: `${exp.role} at ${exp.company}`,
      text: `I worked as a ${exp.role} at ${exp.company} in ${exp.location} from ${exp.startDate} to ${exp.endDate}. ${exp.description.join(' ')}`,
      category: 'resume'
    });
  });

  // Education
  education.forEach(edu => {
    documents.push({
      id: id++,
      title: `${edu.degree} at ${edu.institution}`,
      text: `I studied ${edu.degree} at ${edu.institution} in ${edu.location} from ${edu.startYear} to ${edu.endYear}. ${edu.description || ''}`,
      category: 'resume'
    });
  });

  // Projects
  projects.forEach(project => {
    documents.push({
      id: id++,
      title: project.title,
      text: `${project.title}: ${project.description} Technologies used: ${project.technologies.join(', ')}`,
      category: 'project'
    });
  });

  // Skills
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
    documents.push({
      id: id++,
      title: `${category} Skills`,
      text: `My ${category} skills include: ${categorySkills.map(s => `${s.name} (${s.level}%)`).join(', ')}`,
      category: 'skill'
    });
  });

  // Open Source Contributions
  openSourceContributions.forEach(contribution => {
    documents.push({
      id: id++,
      title: contribution.title,
      text: `Open Source Contribution: ${contribution.title} for ${contribution.organization}. ${contribution.description}`,
      category: 'open-source'
    });
  });

  // Blog posts
  blogPosts.forEach(post => {
    documents.push({
      id: id++,
      title: post.title,
      text: `${post.title}: ${post.excerpt}`,
      category: 'blog'
    });
  });

  return documents;
};

// Precomputed knowledge base
export const knowledgeBase = createKnowledgeBase();