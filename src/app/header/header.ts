import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private router: Router) {}

  goToSection(sectionId: string, event?: Event) {
    if (event) event.preventDefault();
    const scrollToAnchor = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      setTimeout(scrollToAnchor, 0);
    } else {
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(scrollToAnchor, 200);
      });
    }
  }
}
