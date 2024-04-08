import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar-component/snack-bar.component';

@Injectable({ providedIn: 'root' })
export class ToastService {

  snackBar = inject(MatSnackBar);

  public openSnackBar(message: string, type?: string, verticalPosition?: MatSnackBarVerticalPosition, horizontalPosition?: MatSnackBarHorizontalPosition) {
    const _snackType = type !== undefined ? type : '';
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 4000,
      horizontalPosition: horizontalPosition || 'center',
      verticalPosition: verticalPosition || 'bottom',
      panelClass: type,
      data: { message: message, snackType: _snackType, snackBar: this.snackBar }
    });
  }
}