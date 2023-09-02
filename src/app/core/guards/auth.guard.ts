import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private router: Router) { }

    canActivate() {
        const token = localStorage.getItem('access_token');
        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
