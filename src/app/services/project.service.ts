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
      title: 'PathMyWay',
      description: 'Smart career and training platform built with microservices, recommendations, and analytics.',
      category: 'Web-app ai',
      image: 'img/portfolio/pathmyway/thumb.png',
      technologies: ['Angular', 'Spring Boot', 'Microservices', 'Keycloak', 'Eureka', 'Docker', 'CI/CD'],
      fullDescription: 'PathMyWay is an intelligent career guidance and training management platform. It combines a Spring Boot microservices architecture, Angular frontend, secure authentication with Keycloak, service discovery with Eureka, profile-based recommendations, Docker integration, CI/CD, and analytics dashboards.',
      features: [
        'Career and training recommendation engine',
        'Microservices architecture with API Gateway and Eureka',
        'Secure authentication with Keycloak',
        'Angular dashboard with analytics and statistics',
        'Docker integration and CI/CD workflow',
        'User profile and training path management'
      ],
    },
    {
      id: 2,
      title: 'Esprit Maratech 2026',
      description: 'Hackathon project developed in a fast-paced Agile team setting.',
      category: 'Web-app',
      image: 'img/portfolio/maratech/1.png',
      technologies: ['Agile', 'Rapid Prototyping', 'Team Collaboration'],
      fullDescription: 'Esprit Maratech 2026 is a hackathon project focused on rapid solution development, teamwork, Agile collaboration, and solving technical challenges under time constraints.',
      features: [
        'Rapid prototyping',
        'Team-based development',
        'Agile collaboration',
        'Problem solving under deadline',
        'Innovation-focused delivery'
      ],
    },
    {
      id: 3,
      title: 'CAN Anomaly Detection',
      description: 'Embedded AI system for detecting anomalies on automotive CAN network data.',
      category: 'AI',
      image: 'img/portfolio/can-anomaly/thumb.png',
      technologies: ['Python', 'Machine Learning', 'Flask', 'Random Forest', 'XGBoost', 'Optuna'],
      fullDescription: 'An intelligent anomaly detection system for automotive CAN network data, developed during a software engineering and embedded AI internship. The solution includes real-time CAN data analysis, preprocessing pipelines, model comparison, hyperparameter optimization, a Flask REST API, and a web supervision interface.',
      features: [
        'Real-time CAN data analysis',
        'Automotive dataset cleaning and transformation',
        'Random Forest and XGBoost model comparison',
        'Optimization with GridSearchCV and Optuna',
        'REST API built with Flask',
        'Web interface for supervision and testing'
      ],
    },
    {
      id: 4,
      title: 'OnFaitOu',
      description: 'Community platform for event management and social interactions.',
      category: 'Web-app',
      image: 'img/portfolio/onfaitou/thumb.png',
      technologies: ['Spring Boot', 'Angular', 'REST API', 'SQL'],
      fullDescription: 'OnFaitOu is a community event and social platform focused on managing users, events, and interactions. The project includes backend REST services, frontend screens for event discovery and management, and core social features.',
      features: [
        'Event creation and management',
        'User and community management',
        'Social interaction features',
        'REST API design',
        'Responsive frontend experience'
      ],
    },
    {
      id: 5,
      title: 'ShopFlow',
      description: 'Full-stack e-commerce platform built with Angular and Spring Boot.',
      category: 'Web-app',
      image: 'img/portfolio/shopflow/commerce1.png',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'REST API', 'MVC'],
      githubUrl: 'https://github.com/BenGamraOussama/PFE_ISET',
      fullDescription: 'ShopFlow is a full-stack e-commerce platform developed during a final-year internship. It focuses on product browsing, order management, backend REST APIs with Spring Boot, Angular frontend development, MySQL data management, and MVC architecture.',
      features: [
        'Product catalog and shopping workflow',
        'REST APIs with Spring Boot',
        'Angular frontend interface',
        'MySQL database management',
        'MVC architecture',
        'Order and customer flow management'
      ],
    },
    {
      id: 6,
      title: 'HopeNest',
      description: 'Medical management platform for patients and psychiatrists.',
      category: 'Web-app',
      image: 'img/portfolio/hopenest/hopenest.png',
      technologies: ['Symfony', 'JavaFX', 'PostgreSQL', 'Authentication'],
      githubUrl: 'https://github.com/BenGamraOussama/HopeNest',
      fullDescription: 'HopeNest is a medical management platform for patients and psychiatrists. It handles appointments, medical records, consultation tracking, a Symfony backend architecture, JavaFX desktop interface, and secure authentication.',
      features: [
        'Patient and psychiatrist management',
        'Appointment scheduling',
        'Medical records and consultation tracking',
        'Symfony backend architecture',
        'JavaFX desktop interface',
        'Secure authentication system'
      ],
    },
    {
      id: 7,
      title: 'Absence Management',
      description: 'MERN stack web application for managing absences with JWT-secured APIs.',
      category: 'Web-app',
      image: 'img/portfolio/absence/abs.png',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT'],
      githubUrl: 'https://github.com/BenGamraOussama/absence-management',
      fullDescription: 'A MERN stack absence management application developed during an internship at Centre National de l\'Informatique. It includes secure JWT authentication, protected REST APIs, and user interfaces for absence tracking and administration.',
      features: [
        'Absence request and tracking',
        'JWT authentication',
        'Secure REST APIs with Express.js',
        'React.js user interface',
        'MongoDB data management',
        'Admin management views'
      ],
    },
    {
      id: 8,
      title: 'Student Management',
      description: 'Java student management application with a complete DevOps workflow.',
      category: 'Web-app',
      image: 'img/portfolio/student-devops/thumb.png',
      technologies: ['Java', 'Git', 'GitHub', 'Jenkins', 'GitHub Actions', 'Docker', 'Kubernetes'],
      fullDescription: 'Student Management is a Java application paired with a complete DevOps workflow from source control to monitoring. The project covers Git/GitHub versioning, CI/CD with Jenkins and GitHub Actions, Docker containerization, Kubernetes deployment, and service monitoring.',
      features: [
        'Student management features',
        'Git and GitHub version control',
        'CI/CD with Jenkins and GitHub Actions',
        'Docker containerization',
        'Kubernetes deployment',
        'Application monitoring workflow'
      ],
    },
    {
      id: 9,
      title: 'Gestion-UE Etudiant',
      description: 'Student teaching-unit management platform using microservices, SOA, and GraphQL.',
      category: 'Web-app',
      image: 'img/portfolio/gestion-ue/thumb.png',
      technologies: ['Microservices', 'SOA', 'GraphQL', 'REST API'],
      fullDescription: 'Gestion-UE Etudiant is a platform for managing teaching units, students, courses, grades, absences, and academic progress. The project applies microservices and SOA principles and integrates GraphQL for optimized data access.',
      features: [
        'Teaching unit management',
        'Courses, grades, absences and progress tracking',
        'Microservices and SOA architecture',
        'GraphQL data access',
        'Academic administration workflows'
      ],
    },
    {
      id: 10,
      title: 'Machine Learning Recommendation System',
      description: 'Recommendation engine based on user profiles, behavior analysis, and classification.',
      category: 'AI',
      image: 'img/portfolio/ml-recommendation/thumb.png',
      technologies: ['Python', 'Machine Learning', 'Classification', 'Data Analysis'],
      fullDescription: 'A machine learning recommendation system that analyzes user profiles, behaviors, and preferences to generate intelligent recommendations. The project includes algorithm implementation, classification logic, and model evaluation.',
      features: [
        'User profile analysis',
        'Behavior and preference modeling',
        'Recommendation algorithms',
        'Classification models',
        'Model evaluation workflow'
      ],
    },
    {
      id: 11,
      title: 'Power BI Olympic Analytics',
      description: 'Interactive Power BI dashboard for Tokyo 2021 Olympic performance analytics.',
      category: 'Data',
      image: 'img/portfolio/olympic-bi/thumb.png',
      technologies: ['Power BI', 'DAX', 'Data Visualization', 'KPI'],
      fullDescription: 'Power BI Olympic Analytics is a dashboard project analyzing Tokyo 2021 Olympic data. It focuses on athlete participation, performance trends, gender parity, advanced DAX KPIs, and professional interactive visualizations.',
      features: [
        'Interactive Olympic analytics dashboards',
        'Athlete performance analysis',
        'Participation and gender parity metrics',
        'Advanced DAX KPIs',
        'Professional data visualizations'
      ],
    },
    {
      id: 12,
      title: 'Airport Management System',
      description: 'C# desktop system for managing flights, passengers, and airport operations.',
      category: 'Web-app',
      image: 'img/portfolio/airport/thumb.png',
      technologies: ['C#', '.NET', 'Desktop UI'],
      fullDescription: 'Airport Management System is a C# desktop application for airport administration. It centralizes flight, passenger, and operational data and provides a practical interface for real-time activity tracking.',
      features: [
        'Flight management',
        'Passenger management',
        'Airport operations tracking',
        'Desktop administration interface',
        'Centralized activity monitoring'
      ],
    },
    {
      id: 13,
      title: 'Match90Plus',
      description: 'Mobile application for stadium reservations and sports activity management.',
      category: 'Mobile-app',
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
    {
      id: 14,
      title: 'Gestion de Foyer',
      description: 'Java application for managing residential infrastructure and administrative services.',
      category: 'Web-app',
      image: 'img/portfolio/foyer/thumb.png',
      technologies: ['Java', 'OOP', 'SQL', 'GUI'],
      fullDescription: 'Gestion de Foyer is a Java application for managing residential infrastructure. It covers residents, rooms, reservations, administrative services, a relational database, and a graphical user interface while applying object-oriented programming concepts.',
      features: [
        'Resident management',
        'Room and reservation management',
        'Administrative services tracking',
        'Relational database integration',
        'Graphical user interface',
        'Object-oriented design'
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
