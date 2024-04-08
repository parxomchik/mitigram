import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrl:'./snack-bar.component.scss',
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
})
export class SnackBarComponent {

  data = inject(MAT_SNACK_BAR_DATA)


  get getIcon() {
    switch (this.data.snackType) {
      case 'successful':
        return { type: this.data.snackType, icon: 'done' };
      case 'error':
        return { type: this.data.snackType, icon: 'error' };
      case 'successful-delete':
        return { type: this.data.snackType, icon: 'delete_outline' };
      case 'successful-edit':
        return { type: this.data.snackType, icon: 'edit' };
      default:
        return { type: '', icon: '' };
    }
  }

  closeSnackbar() {
    this.data.snackBar.dismiss();
  }
}
