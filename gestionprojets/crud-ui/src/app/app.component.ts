import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="app-wrapper">
      <app-navbar />
      <main class="container page-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .page-content {
      flex: 1;
      padding: 32px 20px;
    }
  `]
})
export class AppComponent {}
