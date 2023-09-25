import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { PreviousUrlService } from '../services/previous-url.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private router: Router, private previousUrlService: PreviousUrlService, private authService: AuthService, private dialog: MatDialog) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.authService.isAuthorized) {
            this.previousUrlService.setUrl(this.getFullUrlFromSnapshot(route));
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    getFullUrlFromSnapshot(snapshot: ActivatedRouteSnapshot): string {
        let url = snapshot.url.map(segment => segment.path).join('/');
        if (snapshot.firstChild) {
            url += '/' + this.getFullUrlFromSnapshot(snapshot.firstChild);
        }
        return url;
    }

}
