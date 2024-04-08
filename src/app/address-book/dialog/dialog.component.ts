import { Component, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Email, ICounterpartsList } from '../models/address-interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog.component.html',
  styleUrl:'dialog.component.scss'
})
export class DialogComponent {
  selectedIndex: number = 0;
  currentSelectedIndex: number = 0;

  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  addressBookData: ICounterpartsList = [];
  emailData: Email[] = [];

  private unsubscribeAll$ = new Subject();
  ngOnInit() {
    this.dialogRef.keydownEvents()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(e => {
        if (e.code === 'Escape') {
          this.cancel();
        }
      });

    this.dialogRef.backdropClick()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(() => this.cancel());
  }

  public onTabChange(index: number) {
    this.currentSelectedIndex = index;
  }

  public cancel(): void {
    this.dialogRef.close({
      result: false
    });
  }

  public onAddressBookDataChange(data: any) {
    this.addressBookData = data;
  }

  public onEmailDataChange(data: any) {
    this.emailData = data;
  }

  public confirm(): void {
    this.emailData = this?.emailData ?? [];
    this.addressBookData = this?.addressBookData ?? [];

    const data = [...this.emailData, ...this.addressBookData];

    this.dialogRef.close({
      isEmail: true,
      result: true,
      data
    });
  }


  public ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.complete();
  }

}
