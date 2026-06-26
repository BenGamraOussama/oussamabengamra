import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";
import { ContactSection } from "../contact/contact-section";
import { Project, ProjectService } from '../services/project.service';
import { isPlatformBrowser } from '@angular/common';
import { Header } from "../header/header";

interface DetailedProject extends Project {
  client?: string;
  date?: string;
  developer?: string;
  images: string[];
}

@Component({
  selector: 'app-portflio-details',
  imports: [Header, Footer, CommonModule, ContactSection, RouterModule],
  templateUrl: './portflio-details.html',
  styleUrls: ['./portflio-details.css']
})
export class PortflioDetails implements OnInit {
  serviceId: number | null = null;
  service: DetailedProject | undefined;
  previousProject: Project | undefined;
  nextProject: Project | undefined;
  currentImageIndex = 0;

  private readonly metadata: Record<number, Pick<DetailedProject, 'client' | 'date' | 'developer' | 'images'>> = {
    1: {
      client: 'ESPRIT',
      date: 'Jan 2026 - May 2026',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/pathmyway/thumb.png'],
    },
    2: {
      client: 'ESPRIT',
      date: 'Feb 2026',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/maratech/1.png', 'img/portfolio/maratech/2.png', 'img/portfolio/maratech/3.png', 'img/portfolio/maratech/4.png', 'img/portfolio/maratech/5.png', 'img/portfolio/maratech/6.png'],
    },
    3: {
      client: 'ACTIA Engineering Services',
      date: 'Jun 2025 - Aug 2025',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/can-anomaly/thumb.png'],
    },
    4: {
      client: 'ESPRIT',
      date: 'Jan 2026 - May 2026',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/onfaitou/thumb.png'],
    },
    5: {
      client: 'DSIGNET',
      date: 'Feb 2024 - May 2024',
      developer: 'Oussama Ben Gamra',
      images: [
        'img/portfolio/shopflow/commerce1.png',
        'img/portfolio/shopflow/commerce2.png',
        'img/portfolio/shopflow/commerce3.png',
        'img/portfolio/shopflow/commerce4.png',
        'img/portfolio/shopflow/commerce5.png',
        'img/portfolio/shopflow/commerce6.png',
      ],
    },
    6: {
      client: 'ESPRIT',
      date: 'Academic project',
      developer: 'Oussama Ben Gamra',
      images: [
        'img/portfolio/hopenest/hopenest1.png',
        'img/portfolio/hopenest/hopenest2.png',
        'img/portfolio/hopenest/hopenest3.png',
        'img/portfolio/hopenest/hopenest4.png',
      ],
    },
    7: {
      client: "Centre National de l'Informatique",
      date: 'Jan 2023 - Feb 2023',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/absence/abs.png'],
    },
    8: {
      client: 'ESPRIT',
      date: 'Academic project',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/student-devops/thumb.png'],
    },
    9: {
      client: 'ESPRIT',
      date: 'Academic project',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/gestion-ue/thumb.png'],
    },
    10: {
      client: 'ESPRIT',
      date: 'Academic project',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/ml-recommendation/thumb.png'],
    },
    11: {
      client: 'ESPRIT',
      date: 'Academic project',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/olympic-bi/thumb.png'],
    },
    12: {
      client: 'ESPRIT',
      date: 'Academic project',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/airport/thumb.png'],
    },
    13: {
      client: 'ESPRIT',
      date: 'Sep 2024',
      developer: 'Oussama Ben Gamra',
      images: [
        'img/portfolio/match90plus/match1.png',
        'img/portfolio/match90plus/match2.png',
        'img/portfolio/match90plus/match3.png',
        'img/portfolio/match90plus/match4.png',
      ],
    },
    14: {
      client: 'ESPRIT',
      date: 'Academic project',
      developer: 'Oussama Ben Gamra',
      images: ['img/portfolio/foyer/thumb.png'],
    },
    
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.serviceId = idParam ? +idParam : null;
      const project = this.serviceId ? this.projectService.getProjectById(this.serviceId) : undefined;

      if (project) {
        const metadata = this.metadata[project.id] ?? {
          client: 'Portfolio',
          date: 'Project',
          developer: 'Oussama Ben Gamra',
          images: [project.image],
        };

        this.service = {
          ...project,
          ...metadata,
          images: metadata.images.length ? metadata.images : [project.image],
        };
        this.currentImageIndex = 0;

        const projects = this.projectService.getAllProjects();
        const currentIndex = projects.findIndex(item => item.id === project.id);

        if (currentIndex >= 0) {
          const previousIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
          const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;

          this.previousProject = projects[previousIndex];
          this.nextProject = projects[nextIndex];
        }
      } else {
        this.service = undefined;
        this.previousProject = undefined;
        this.nextProject = undefined;
        this.currentImageIndex = 0;
      }
    });
  }

  get hasMultipleImages(): boolean {
    return (this.service?.images.length ?? 0) > 1;
  }

  get carouselImages(): string[] {
    const images = this.service?.images ?? [];

    if (images.length < 2) {
      return images;
    }

    return images.map((_, index) => images[(this.currentImageIndex + index) % images.length]);
  }

  previousImage(): void {
    const imagesCount = this.service?.images.length ?? 0;

    if (imagesCount < 2) {
      return;
    }

    this.currentImageIndex = (this.currentImageIndex - 1 + imagesCount) % imagesCount;
  }

  nextImage(): void {
    const imagesCount = this.service?.images.length ?? 0;

    if (imagesCount < 2) {
      return;
    }

    this.currentImageIndex = (this.currentImageIndex + 1) % imagesCount;
  }

  selectImage(index: number): void {
    const imagesCount = this.service?.images.length ?? 0;

    if (index < 0 || index >= imagesCount) {
      return;
    }

    this.currentImageIndex = index;
  }

  trackImage(index: number, image: string): string {
    return `${index}-${image}`;
  }

  navigateToServices() {
    this.router.navigate(['/']).then(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.setTimeout(() => {
          const target = document.getElementById('portfolio');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 0);
      }
    });
  }
}
