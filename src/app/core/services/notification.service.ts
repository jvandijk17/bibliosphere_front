import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AlertComponent } from '../../shared/alert/alert.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private isLoading = new BehaviorSubject<boolean>(false);

    constructor(private dialog: MatDialog) { }

    public get loading$() {
        return this.isLoading.asObservable();
    }

    public setLoading(value: boolean): void {
        this.isLoading.next(value);
    }

    public showAlert(message: string, confirm?: boolean) {
        this.dialog.open(AlertComponent, {
            width: '300px',
            data: { message, confirm }
        });
    }
}
