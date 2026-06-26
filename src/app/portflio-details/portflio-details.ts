import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Footer } from "../footer/footer";
import { ContactSection } from "../contact/contact-section";
import { Project, ProjectService } from '../services/project.service';
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
export class PortflioDetails implements OnInit, OnDestroy {
  serviceId: number | null = null;
  service: DetailedProject | undefined;
  previousProject: Project | undefined;
  nextProject: Project | undefined;
  currentImageIndex = 0;
  autoPlayPaused = false;
  autoPlayInterval = 5000;
  animKey = 0;
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;
  private isBrowser: boolean;

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
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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
        this.startAutoPlay();

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

  previousImage(): void {
    const count = this.service?.images.length ?? 0;
    if (count < 2) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + count) % count;
    this.animKey++;
    this.resetAutoPlay();
  }

  nextImage(): void {
    const count = this.service?.images.length ?? 0;
    if (count < 2) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % count;
    this.animKey++;
    this.resetAutoPlay();
  }

  selectImage(index: number): void {
    const count = this.service?.images.length ?? 0;
    if (index < 0 || index >= count) return;
    this.currentImageIndex = index;
    this.animKey++;
    this.resetAutoPlay();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.previousImage();
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
      event.preventDefault();
    }
  }

  pauseAutoPlay(): void {
    this.autoPlayPaused = true;
  }

  resumeAutoPlay(): void {
    this.autoPlayPaused = false;
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    if (!this.isBrowser || !this.hasMultipleImages) return;
    this.autoPlayTimer = setInterval(() => {
      if (!this.autoPlayPaused) {
        this.nextImage();
      }
    }, this.autoPlayInterval);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
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
