import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../shared/alert/alert.component';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private dialog: MatDialog) { }

    public showAlert(message: string, confirm?: boolean) {
        this.dialog.open(AlertComponent, {
            width: '300px',
            data: { message, confirm }
        });
    }

}