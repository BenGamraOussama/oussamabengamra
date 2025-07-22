import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { isPlatformBrowser } from '@angular/common';
import { Project, ProjectService } from '../services/project.service';
import { ContactSection } from "../contact/contact-section";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer, ContactSection],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          setTimeout(() => {
            const el = document.getElementById(fragment);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 200);
        }
      });
    }
  }

  navigateToPortfolioDetails(id: number): void {
    this.router.navigate(['/portflio-details', id]);
  }
}
