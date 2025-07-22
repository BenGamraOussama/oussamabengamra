import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";
import { ContactSection } from "../contact/contact-section";

interface DetailedProject {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  client?: string;
  date?: string;
  developer?: string;
  fullDescription?: string;
  features?: string[];
  images?: string[];
  details?: string;
  technologies?: string[];
  githubUrl?: string;
}

@Component({
  selector: 'app-portflio-details',
  imports: [Footer, CommonModule, ContactSection],
  templateUrl: './portflio-details.html',
  styleUrls: ['./portflio-details.css']
})
export class PortflioDetails implements OnInit {
  serviceId: number | null = null;
  service: DetailedProject | undefined;

  services: DetailedProject[] = [
    {
    id: 1,
    image: 'img/portfolio/hopenest/hopenest.png',
    title: 'HopeNest',
    description: 'Mental health support application with adaptive resources and user-friendly interface.',
    category: 'Mental Health Platform',
    client: 'ESPRIT',
    date: 'January 20, 2025',
    developer: 'NovaTeam',
    fullDescription: 'HopeNest is a comprehensive mental health support application designed to provide adaptive resources and an intuitive user interface for individuals seeking mental health support. The application features personalized content, interactive tools, and a supportive community platform.',
    features: [
        'Personalized mental health resources',
        'Interactive mood tracking',
        'Community support forums',
        'Professional consultation booking',
        'Progress monitoring dashboard',
        'Mobile-responsive design'
      ],
      images: [
        'img/portfolio/hopenest/hopenest1.png',
        'img/portfolio/hopenest/hopenest2.png',
        'img/portfolio/hopenest/hopenest3.png',
        'img/portfolio/hopenest/hopenest4.png',
      ],
      technologies: ['Symfony', 'PostgreSQL', 'API Integration'],
      githubUrl: 'https://github.com/BenGamraOussama/HopeNest',
  },
  {
      id: 2,
      image: 'img/portfolio/shopflow/commerce1.png',
      title: 'ShopFlow',
      description: 'E-commerce application designed to enhance online shopping experience.',
      category: 'E-commerce',
      client: 'ISET',
      date: 'February 2024',
      developer: 'Oussama Ben Gamra',
      fullDescription: 'ShopFlow is an innovative e-commerce application designed to help client companies adapt to new e-commerce trends and improve the customer experience. The project focuses on developing a robust online sales application with modern features and an intuitive interface.',
      features: [
        'Modern e-commerce interface',
        'Product catalog management',
        'Shopping cart and checkout process',
        'Payment gateway integration',
        'Order tracking and management',
        'Customer reviews and ratings'
      ],
      images: [
        'img/portfolio/shopflow/commerce1.png',
        'img/portfolio/shopflow/commerce2.png',
        'img/portfolio/shopflow/commerce3.png',
        'img/portfolio/shopflow/commerce4.png',
        'img/portfolio/shopflow/commerce5.png',
        'img/portfolio/shopflow/commerce6.png'
      ],
      technologies: ['Angular', 'Spring Boot', 'Mysql', 'API Integration'],
      githubUrl: 'https://github.com/BenGamraOussama/PFE_ISET'
    },
    {
      id: 3,
      image: 'img/portfolio/match90plus/match.png',
      title: 'Match90Plus',
      description: 'Mobile application for stadium reservations and sports activity management.',
      category: 'mobile-app',
      client: 'ESPRIT',
      date: 'September 20, 2024',
      developer: 'Oussama Ben Gamra',
      fullDescription: 'Match90Plus is a comprehensive mobile application that centralizes stadium reservations and sports activity management. The application allows users to check stadium availability, make online reservations, and form teams or find partners. Managers can manage reservations, track facility usage, and receive feedback from users.',
      features: [
        'Stadium availability checking',
        'Online reservation system',
        'Team formation tools',
        'Partner finding system',
        'Facility usage tracking'
      ],
      images: [
        'img/portfolio/match90plus/match1.png',
        'img/portfolio/match90plus/match2.png',
        'img/portfolio/match90plus/match3.png',
        'img/portfolio/match90plus/match4.png'
      ],
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Express.js'],
      githubUrl: 'https://github.com/BenGamraOussama/Symfony_PI_DEV',
    },
    {
      id: 4,
      image: 'img/portfolio/absence/abs.png',
      title: 'Absence Management',
      description: 'MERN stack application for managing employee absences with secure authentication.',
      category: 'HR Management',
      client: 'ISET',
      date: 'March 2023',
      developer: 'Oussama Ben Gamra',
      fullDescription: 'This project is a comprehensive MERN stack application designed to manage employee absences efficiently. It includes secure authentication, user-friendly interfaces, and robust backend services to handle absence requests and approvals.',
      features: [
        'Employee login and registration',
        'Absence request submission',
        'Admin dashboard for managing absences',
        'Email notifications for approvals'
      ],
      images: [
        'img/portfolio/absence/abs.png',
      ],
      technologies: ['Node.js', 'React.js', 'MongoDB'],
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
      this.router.navigate(['/'], { fragment: 'work' });
    }
  }
  