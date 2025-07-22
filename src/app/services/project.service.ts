import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  fullDescription: string;
  features: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  private projects: Project[] = [
    {
      id: 1,
      title: 'HopeNest',
      description: 'Mental health support application with adaptive resources and user-friendly interface.',
      category: 'web-app',
      image: 'img/portfolio/hopenest/hopenest.png',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'JWT'],
      githubUrl: 'https://github.com/BenGamraOussama/HopeNest',
      fullDescription: 'HopeNest is a comprehensive mental health support application designed to provide adaptive resources and an intuitive user interface for individuals seeking mental health support. The application features personalized content, interactive tools, and a supportive community platform.',
      features: [
        'Personalized mental health resources',
        'Interactive mood tracking',
        'Community support forums',
        'Professional consultation booking',
        'Progress monitoring dashboard',
        'Mobile-responsive design'
      ],
    },
    {
      id: 4,
      title: 'Absence Management',
      description: 'MERN stack application for managing employee absences with secure authentication.',
      category: 'web-app',
      image: 'img/portfolio/absence/abs.png',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT'],
      githubUrl: 'https://github.com/BenGamraOussama/absence-management',
      fullDescription: 'A comprehensive MERN stack application for managing employee absences with secure authentication. The system allows teachers and students to manage presences online, featuring a dynamic user interface with React.js for teachers and students to manage presences online.',
      features: [
        'Dynamic user interface with React.js',
        'Secure REST API with Express.js and JWT',
        'Real-time presence tracking',
        'Employee dashboard',
        'Admin management panel',
        'Absence report generation',
        'Email notifications'
      ],
    },
    {
      id: 2,
      title: 'ShopFlow',
      description: 'E-commerce application designed to enhance online shopping experience.',
      category: 'web-app',
      image: 'img/portfolio/shopflow/commerce1.png',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Stripe API'],
      githubUrl: 'https://github.com/BenGamraOussama/ShopFlow',
      fullDescription: 'ShopFlow is an innovative e-commerce application designed to help client companies adapt to new e-commerce trends and improve the customer experience. The project focuses on developing a robust online sales application with modern features and an intuitive interface.',
      features: [
        'Modern e-commerce interface',
        'Secure payment processing',
        'Inventory management',
        'Order tracking system',
        'Customer review system',
        'Admin dashboard',
        'Mobile-responsive design'
      ],
    },
    {
      id: 3,
      title: 'Match90Plus',
      description: 'Mobile application for stadium reservations and sports activity management.',
      category: 'mobile-app',
      image: 'img/portfolio/match90plus/match.png',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Express.js'],
      githubUrl: 'https://github.com/BenGamraOussama/Match90Plus',
      fullDescription: 'Match90Plus is a comprehensive mobile application that centralizes stadium reservations and sports activity management. The application allows users to check stadium availability, make online reservations, and form teams or find partners. Managers can manage reservations, track facility usage, and receive feedback from users.',
      features: [
        'Stadium availability checking',
        'Online reservation system',
        'Team formation tools',
        'Partner finding system',
        'Facility usage tracking',
        'User feedback system',
        'Real-time notifications'
      ],
    },
    
  ];

  constructor() { }

  getAllProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  getProjectsByCategory(category: string): Project[] {
    return this.projects.filter(project => project.category === category);
  }
}
