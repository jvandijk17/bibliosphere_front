import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { PreviousUrlService } from '../services/previous-url.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private router: Router, private previousUrlService: PreviousUrlService) { }

    canActivate(state: RouterStateSnapshot) {

        const token = localStorage.getItem('access_token');

        this.previousUrlService.setUrl(state.url);

        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
