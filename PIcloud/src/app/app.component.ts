import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PIcloud';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
