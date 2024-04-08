import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, EventEmitter, OnDestroy, Output, inject } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";

@Component({
  selector: 'address-email-dialog',
  templateUrl: 'address-email-dialog.component.html',
  styleUrl: 'address-email-dialog.component.scss'
})
export class AddressEmailDialog implements OnDestroy {
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  
  announcer = inject(LiveAnnouncer);
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  isInvalidEmail: boolean = false;
  public hintInfo: string = 'To add an email, write it and press enter.';

  private unsubscribeAll$ = new Subject();

  keywords: string[] = [];

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
    }
    this.dataChange.emit(this.keywords);
  }

  add(event: MatChipInputEvent): void {
    const input = event.chipInput;
    const value = event.value.trim();

    if (this.isValidEmail(value)) {
      this.keywords.push(value);
      this.emitDataChange();
    }
    if (input) {
      input.inputElement.value = '';
      this.isInvalidEmail = false;
    }
  }

  validateEmail(input: Event): void {
    const target = input.target as HTMLInputElement; 
    if (!target.value) {
      this.isInvalidEmail = false;
    } else {
      this.isInvalidEmail = !this.isValidEmail(target.value.trim());
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private emitDataChange() {
    const emails = this.keywords.map(email => ({ email }));
    this.dataChange.emit(emails);
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.complete();
  }

}