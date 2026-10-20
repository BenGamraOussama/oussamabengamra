import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { isPlatformBrowser } from '@angular/common';
import { Project, ProjectService } from '../services/project.service';
import { ContactSection } from "../contact/contact-section";

declare const window: Window & {
  $?: any;
  jQuery?: any;
  WOW?: new (config?: { live?: boolean }) => { init(): void };
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer, ContactSection],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('yearsCounter') private yearsCounter?: ElementRef<HTMLElement>;
  @ViewChild('projectsCounter') private projectsCounter?: ElementRef<HTMLElement>;
  @ViewChild('internshipsCounter') private internshipsCounter?: ElementRef<HTMLElement>;
  @ViewChild('domainsCounter') private domainsCounter?: ElementRef<HTMLElement>;

  projects: Project[] = [];
  private funFactObserver?: IntersectionObserver;
  private funFactFrameIds: number[] = [];
  private funFactsAnimated = false;
  private fragmentSubscription?: Subscription;
  skills: Array<{ name: string; category: string; icon?: string; initials?: string }> = [
    { name: 'Angular', category: 'Frontend', icon: 'img/icons/angular.png' },
    { name: 'Spring Boot', category: 'Backend', icon: 'img/icons/spring.png' },
    { name: 'FastAPI', category: 'Backend', initials: 'API' },
    { name: 'Microservices', category: 'Architecture', icon: 'img/icons/microservices.png' },
    { name: 'Keycloak', category: 'Security', icon: 'img/icons/keycloak.png' },
    { name: 'Docker', category: 'DevOps', icon: 'img/icons/docker.png' },
    { name: 'Kubernetes', category: 'DevOps', icon: 'img/icons/kubernetes.png' },
    { name: 'RAG & NLP', category: 'AI', icon: 'img/icons/ai.png' },
    { name: 'Power BI', category: 'Data', icon: 'img/icons/powerbi.png' },
    { name: 'React Native', category: 'Mobile', icon: 'img/icons/react.png' },
    { name: 'Node.js', category: 'Backend', icon: 'img/icons/node.png' },
    { name: 'MongoDB', category: 'Database', icon: 'img/icons/mongodb.png' },
    { name: 'PostgreSQL', category: 'Database', icon: 'img/icons/postgres.png' },
  ];

  skillGroups = [
    {
      title: 'Languages',
      items: 'Java, Python, JavaScript, TypeScript, SQL'
    },
    {
      title: 'Frontend & Mobile',
      items: 'Angular, React, React Native, responsive UI, dashboards'
    },
    {
      title: 'Backend & Security',
      items: 'Spring Boot, FastAPI, Node.js, Express.js, Symfony, Flask, Keycloak, secure API design'
    },
    {
      title: 'Architecture',
      items: 'Microservices, REST API, MVC, SOA, GraphQL, distributed systems'
    },
    {
      title: 'DevOps & Cloud',
      items: 'Docker, Kubernetes, Jenkins, GitHub Actions, CI/CD, monitoring'
    },
    {
      title: 'Data & AI',
      items: 'Machine learning, NLP, RAG, Llama 3, Ollama, Random Forest, XGBoost, Power BI, DAX'
    },
  ];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();
    if (isPlatformBrowser(this.platformId)) {
      this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
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

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.setTimeout(() => {
      this.initializeHomeLayout();
      this.initializeWOW();
      this.initializeFunFactCounters();
    }, 0);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.fragmentSubscription?.unsubscribe();
    this.funFactObserver?.disconnect();
    this.funFactFrameIds.forEach(frameId => window.cancelAnimationFrame(frameId));
    this.destroyHomeLayout();
  }

  private initializeHomeLayout(): void {
    this.initializePortfolioFilter();
    this.initializeServiceHoverBackground();
  }

  private initializeWOW(): void {
    if (window.WOW) {
      new window.WOW({ live: false }).init();
    }
  }

  private initializePortfolioFilter(): void {
    const $ = window.jQuery || window.$;

    if (!$?.fn?.isotope) {
      return;
    }

    const portfolioBox = $('.portfolio-box');
    const filterButtons = $('.filter-button-group button');

    if (!portfolioBox.length) {
      return;
    }

    const initializeGrid = () => {
      const grid = portfolioBox.isotope({
        masonry: {
          columnWidth: '.portfolio-box .portfolio-sizer',
          gutter: '.portfolio-box .gutter-sizer',
        },
        itemSelector: '.portfolio-box .portfolio-item',
        percentPosition: true,
      });

      filterButtons.off('click.homePortfolio').on('click.homePortfolio', function (this: HTMLElement) {
        const filterValue = $(this).attr('data-filter');

        filterButtons.removeClass('active');
        $(this).addClass('active');
        grid.isotope({ filter: filterValue });
      });

      grid.isotope('layout');
    };

    if ($.fn.imagesLoaded) {
      portfolioBox.imagesLoaded(initializeGrid);
    } else {
      initializeGrid();
    }
  }

  private initializeServiceHoverBackground(): void {
    const $ = window.jQuery || window.$;

    if (!$) {
      return;
    }

    const activeBg = $('.services-widget .active-bg');
    const serviceItems = $('.services-widget .service-item');
    const currentItem = $('.services-widget .service-item.current');

    if (!activeBg.length || !serviceItems.length || !currentItem.length) {
      return;
    }

    const moveBackground = (item: any) => {
      activeBg.css({
        top: item.position().top,
        height: item.outerHeight(),
      });
    };

    serviceItems.off('mouseenter.homeServices').on('mouseenter.homeServices', function (this: HTMLElement) {
      moveBackground($(this));
    });

    $('.services-widget')
      .off('mouseleave.homeServices')
      .on('mouseleave.homeServices', () => moveBackground(currentItem));

    moveBackground(currentItem);
  }

  private initializeFunFactCounters(): void {
    const counters = [
      { element: this.yearsCounter?.nativeElement, value: 4 },
      { element: this.projectsCounter?.nativeElement, value: 16 },
      {element: this.internshipsCounter?.nativeElement, value: 4},
      {element: this.domainsCounter?.nativeElement, value: 7}
    ].filter((counter): counter is { element: HTMLElement; value: number } => Boolean(counter.element));

    if (!counters.length || this.funFactsAnimated) {
      return;
    }

    const animateAllCounters = () => {
      if (this.funFactsAnimated) {
        return;
      }

      this.funFactsAnimated = true;
      counters.forEach(counter => this.animateCounter(counter.element, counter.value));
      this.funFactObserver?.disconnect();
    };

    if (!('IntersectionObserver' in window)) {
      animateAllCounters();
      return;
    }

    this.funFactObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        animateAllCounters();
      }
    }, { threshold: 0.35 });

    const funFactSection = counters[0].element.closest('.funfact-area');
    if (funFactSection) {
      this.funFactObserver.observe(funFactSection);
      return;
    }

    animateAllCounters();
  }

  private animateCounter(element: HTMLElement, endValue: number): void {
    const startValue = 0;
    const duration = 1100;
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);

      element.textContent = `${currentValue}`;

      if (progress < 1) {
        const frameId = window.requestAnimationFrame(step);
        this.funFactFrameIds.push(frameId);
      }
    };

    element.textContent = '0';
    const frameId = window.requestAnimationFrame(step);
    this.funFactFrameIds.push(frameId);
  }

  private destroyHomeLayout(): void {
    const $ = window.jQuery || window.$;

    if (!$) {
      return;
    }

    $('.filter-button-group button').off('click.homePortfolio');
    $('.services-widget .service-item').off('mouseenter.homeServices');
    $('.services-widget').off('mouseleave.homeServices');

    const portfolioBox = $('.portfolio-box');
    if ($.fn?.isotope && portfolioBox.length && portfolioBox.data('isotope')) {
      portfolioBox.isotope('destroy');
    }
  }
}
