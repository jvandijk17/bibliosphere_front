import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PreviousUrlService {

    private previousUrl = '';

    setUrl(url: string): void {
        this.previousUrl = url;
    }

    getUrl(): string {
        return this.previousUrl;
    }

}