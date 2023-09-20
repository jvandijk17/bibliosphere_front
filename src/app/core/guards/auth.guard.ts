import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { PreviousUrlService } from '../services/previous-url.service';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private router: Router, private previousUrlService: PreviousUrlService, private authService: AuthService) { }

    canActivate(state: RouterStateSnapshot) {

        if (!this.authService.isAuthorized) {
            this.previousUrlService.setUrl(state.url);
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
