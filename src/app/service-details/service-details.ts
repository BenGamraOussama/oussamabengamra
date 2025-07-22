import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Footer } from "../footer/footer";
import { CommonModule } from '@angular/common';
import { ContactSection } from "../contact/contact-section";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  description1?: string;
  details?: string[];
  competences?: string[];
}

@Component({
  selector: 'app-service-details',
  imports: [CommonModule, Footer, RouterModule],
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
  title: 'Full-Stack Development',
  description: 'As a Full-Stack Developer, I design and build complete web applications, from user interface to server-side data management. I master modern technologies to create high-performance, secure, and scalable solutions tailored to the specific needs of each project.',
  competences:[ 
   'Front-end: HTML, CSS, JavaScript, Angular, React',
   'Back-end: Node.js, Spring Boot, PHP (Laravel)',
   'Databases: MySQL, PostgreSQL, MongoDB',
   'CI/CD, cloud hosting, optimization & maintenance',
   'I work in a structured and transparent manner through the following stages:',
],
  details:[
    'Analysis of client needs and objectives',
    'Custom UI/UX design and prototyping',
    'Modular Front-end & Back-end development',
    'Functional, unit and security testing',
    'Production deployment, monitoring and evolution',
  ],
},
{
  id: 2,
  image: 'img/services/cloud.jpeg',
  title: 'Cloud & DevOps Solutions',
  description: 'As a Cloud & DevOps Engineer, I design, deploy, and maintain scalable, secure, and automated infrastructures. I help businesses migrate to the cloud, modernize their systems, and improve the availability, performance, and resilience of their services.',
  competences:[ 
    'Cloud providers: AWS, Azure, Google Cloud Platform',
    'Infrastructure as Code: Terraform, Ansible, CloudFormation',
    'Containerization: Docker, Kubernetes, Helm',
    'CI/CD: GitHub Actions, GitLab CI, Jenkins, monitoring (Prometheus, Grafana)',
  ],
  description1: 'Each cloud project follows a rigorous and adaptable methodology:',
  details:[
    'Analysis of existing architecture and cloud objectives',
    'Design of secure and scalable infrastructure',
    'Deployment automation and continuous integration',
    'Monitoring, alerting and backup systems setup',
    'Cost optimization and long-term support',
     ],
},
{
  id: 3,
  image: 'img/services/ai.jpeg',
  title: 'Artificial Intelligence Development',
  description: 'As an AI Developer, I design intelligent solutions capable of analyzing data, automating complex tasks, and enhancing decision-making. I integrate machine learning and predictive models into real-world, high-performance applications.',
  competences: [
   'Machine Learning: Scikit-learn, TensorFlow, PyTorch',
   'Deep Learning: Neural Networks, CNN, LSTM, Transformers',
   'Data processing: Pandas, NumPy, Spark, OpenCV',
   'Deployment: REST API, FastAPI, Docker, MLflow',
   ],
  description1: 'Each AI project is carried out with precision through the following stages:',
  details:[ 'Data collection, cleaning and preparation',
   'Model selection and training',
   'Model evaluation, tuning, and cross-validation',
   'Integration into existing systems (API, web interface...)',
   'Performance tracking and continuous improvement',
  ],
},
{
  id: 4,
  image: 'img/services/api.jpeg',
  title: 'API & Web Services Integration',
  description: 'I integrate third-party APIs or design custom APIs to connect different applications, automate data exchange, and enhance business features. My approach ensures smooth, secure, and efficient communication between systems.',
   competences: [
    'REST, GraphQL, WebSocket, gRPC',
    'Tools: Postman, Swagger, Insomnia',
    'Authentication: OAuth2, JWT, API Key',
    'Third-party APIs: Stripe, Google Maps, Twilio, SendGrid, etc.',
   ],
  description1: 'The API integration process follows clear and efficient steps:',
  details:[ 'Analysis of functional and technical requirements',
   'Review of existing API documentation',
   'Development of robust connection interfaces',
   'Error handling, security and performance tuning',
   'Testing, monitoring and scalability of integration',
  ],
}

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
}
