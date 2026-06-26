import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Footer } from "../footer/footer";
import { CommonModule } from '@angular/common';
import { Header } from "../header/header";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
  description1?: string;
  details?: string[];
  competences?: string[];
}

@Component({
  selector: 'app-service-details',
  imports: [Header, CommonModule, Footer, RouterModule],
  templateUrl: './service-details.html',
  styleUrl: './service-details.css'
})
export class ServiceDetails implements OnInit {
  serviceId: number | null = null;
  service: Service | undefined;

  services: Service[] = [
    {
      id: 1,
      image: 'img/services/fullstack.jpg',
      icon: 'flaticon-design',
      title: 'Full-Stack Development',
      description: 'I design and build complete web applications from frontend interfaces to backend APIs, database modeling, authentication, deployment, and maintenance.',
      competences: [
        'Frontend: Angular, React.js, HTML5, CSS3, Bootstrap',
        'Backend: Spring Boot, Node.js, Express.js, Symfony, Flask',
        'Databases: PostgreSQL, MySQL, MongoDB',
        'Security: JWT, Keycloak, API authentication',
      ],
      description1: 'A full-stack project is delivered through a clear implementation cycle:',
      details: [
        'Functional analysis and technical scoping',
        'UI structure and frontend development',
        'REST API design and backend implementation',
        'Database schema and integration',
        'Testing, deployment and iterative improvements',
      ],
    },
    {
      id: 2,
      image: 'img/services/api.jpeg',
      icon: 'flaticon-ux-design',
      title: 'Architecture & Microservices',
      description: 'I structure applications around maintainable backend architecture, modular services, clean API contracts, and scalable communication patterns.',
      competences: [
        'Architecture: Microservices, SOA, MVC, distributed systems',
        'Integration: REST API, GraphQL, API Gateway',
        'Service management: Eureka, service discovery, modular boundaries',
        'Documentation and testing: Postman, API validation, integration flows',
      ],
      description1: 'Architecture work focuses on reliability and long-term maintainability:',
      details: [
        'Domain decomposition and service boundaries',
        'API contract design and data flow mapping',
        'Authentication and authorization strategy',
        'Integration testing and error handling',
        'Performance, scalability and maintainability review',
      ],
    },
    {
      id: 3,
      image: 'img/services/ai.jpeg',
      icon: 'flaticon-web-design',
      title: 'AI, ML & Data Analytics',
      description: 'I build intelligent features and analytical dashboards, from machine learning pipelines to Flask APIs, recommendation systems, anomaly detection and Power BI reporting.',
      competences: [
        'Machine Learning: Random Forest, XGBoost, classification, recommendation systems',
        'Optimization: GridSearchCV, Optuna, model comparison',
        'Data & BI: Power BI, DAX, KPI, data visualization',
        'Deployment: Flask REST API and web supervision interfaces',
      ],
      description1: 'AI and analytics projects are handled with measurable model and data quality:',
      details: [
        'Data collection, cleaning and preprocessing',
        'Feature engineering and model selection',
        'Training, evaluation and optimization',
        'API or dashboard integration',
        'Monitoring, reporting and continuous improvement',
      ],
    },
    {
      id: 4,
      image: 'img/services/cloud.jpeg',
      icon: 'flaticon-3d-movie',
      title: 'DevOps & Cloud Engineering',
      description: 'I automate delivery workflows and prepare applications for reliable deployment using CI/CD, containers, orchestration, and monitoring practices.',
      competences: [
        'CI/CD: Jenkins, GitHub Actions, automated pipelines',
        'Containers: Docker, Docker Compose, Kubernetes',
        'Versioning: Git, GitHub workflow and branching',
        'Operations: monitoring, deployment checks, performance follow-up',
      ],
      description1: 'DevOps work is built around repeatable delivery and operational visibility:',
      details: [
        'Repository workflow and pipeline design',
        'Build, test and quality gates setup',
        'Docker containerization',
        'Kubernetes deployment and service exposure',
        'Monitoring, rollback and maintenance workflow',
      ],
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.serviceId = idParam ? +idParam : null;
      this.service = this.services.find(s => s.id === this.serviceId);
    });
  }

  navigateToServices() {
    this.router.navigate(['/'], { fragment: 'services' });
  }

  selectService(serviceId: number) {
    this.router.navigate(['/service-details', serviceId]);
  }
}
