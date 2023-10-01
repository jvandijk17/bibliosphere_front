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

  get isOnLoginPage(): boolean {
    return this.router.url === '/account/login';
  }

  onLogout(): void {
    this.authService.logout(true);
    this.router.navigate(['/account/login']);
  }

  editAccount(): void {    
    this.router.navigate(['/account/edit']);
  }

}
