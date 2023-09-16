import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  get isUserAuthenticated(): boolean {
    return this.authService.isAuthorized;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }

}
