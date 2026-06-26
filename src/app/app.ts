import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  protected title = 'portflio';
  private routerSubscription?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.removePreloaders();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.removePreloaders());
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private removePreloaders(): void {
    window.setTimeout(() => {
      document.querySelectorAll('.preloader').forEach(preloader => preloader.remove());
    }, 0);
  }
}
