import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  public confirmMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, confirm?: boolean },
    public dialogRef: MatDialogRef<AlertComponent>
  ) {
    if (data.confirm) {
      this.confirmMode = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
