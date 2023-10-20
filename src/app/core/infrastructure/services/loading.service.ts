import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LoadingService {

    private isLoading = new BehaviorSubject<boolean>(false);

    public get loading$() {
        return this.isLoading.asObservable();
    }

    public setLoading(value: boolean): void {
        this.isLoading.next(value);
    }

}