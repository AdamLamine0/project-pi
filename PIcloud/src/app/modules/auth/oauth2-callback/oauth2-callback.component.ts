import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-oauth2-callback',
  template: '<p style="text-align:center;margin-top:3rem">Logging in...</p>'
})
export class Oauth2CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const needsPassword = params['needsPassword'] === 'true';

      console.log('token:', token);
      console.log('needsPassword:', needsPassword);

      if (token) {
        this.authService.saveToken(token);

        if (needsPassword) {
          // Google user with no password → go set password page
          this.router.navigate(['/user/set-password']);
        } else {
          // normal → go to profile
          this.router.navigate(['/user/profile']);
        }
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}