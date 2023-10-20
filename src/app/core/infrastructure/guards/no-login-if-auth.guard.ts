import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../application-services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class NoLoginIfAuthGuard {

    constructor(private router: Router, private authService: AuthService) { }

    canActivateChild(): boolean {
        if (this.authService.isAuthorized) {
            this.router.navigate(['/control-panel']);
            return false;
        }
        return true;
    }

}