import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  constructor(private router: Router) {}

  goToSection(sectionId: string, event?: Event) {
    event?.preventDefault();

    const scrollToAnchor = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const currentPath = this.router.url.split('#')[0].split('?')[0];

    if (currentPath === '/' || currentPath === '') {
      this.router.navigate([], { fragment: sectionId }).then(() => {
        setTimeout(scrollToAnchor, 0);
      });
      return;
    }

    this.router.navigate(['/'], { fragment: sectionId }).then(() => {
      setTimeout(scrollToAnchor, 200);
    });
  }
}
