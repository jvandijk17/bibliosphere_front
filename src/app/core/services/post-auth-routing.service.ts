import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PreviousUrlService } from "./previous-url.service";

@Injectable({
    providedIn: 'root'
})
export class PostAuthRoutingService {

    constructor(private router: Router, private previousUrlService: PreviousUrlService) { }

    navigateAfterAuthentication(): void {
        const previousUrl = this.previousUrlService.getUrl() || '';

        if (previousUrl === '/account/login' || previousUrl.length === 0) {
            this.router.navigate(['/control-panel']);
        } else {
            this.router.navigate([previousUrl || '/control-panel']);
        }

    }

}