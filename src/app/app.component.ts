import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <header class="topbar">
        <a routerLink="/" class="brand">
          <span class="brand-mark">ST</span>
          <span><strong>Siva Transport</strong><small>School Transport Management</small></span>
        </a>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
          <a routerLink="/students" routerLinkActive="active">Students</a>
        </nav>
      </header>
      <main><router-outlet /></main>
      <nav class="mobile-nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">⌂<span>Home</span></a>
        <a routerLink="/students" routerLinkActive="active">♙<span>Students</span></a>
      </nav>
    </div>
  `
})
export class AppComponent {}