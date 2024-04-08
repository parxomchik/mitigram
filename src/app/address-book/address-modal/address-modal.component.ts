import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { Child, Group, IGroupList } from "../models/address-interface";


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'address-modal.component.html',
  styleUrl: './address-modal.component.scss',
})
export class AddressModalDialog implements OnInit, OnDestroy {
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  
  mainArray!: IGroupList;

  allCheckboxesChecked: boolean = false;

  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  private unsubscribeAll$ = new Subject();

  ngOnInit(): void {
    this.mainArray = [...this.data.result];
  }

  public expend(group: Group) {
    group.expandableClosed = !group.expandableClosed;
  }

  private emitDataChange() {
    const checkedData: Child[] = [];
    this.mainArray.forEach((group: Group) => {
      group.childrens.forEach((child: Child) => {
        if (child.checked) {
          checkedData.push(child);
        }
      });
    });
    this.dataChange.emit(checkedData);
  }
  public setChild(completed: boolean, groupId: string, childId: string) {
    for (let group of this.mainArray) {
      if (group.id === groupId) {
        group.childrens = group.childrens.map((child: Child) => {
          if (child.id === childId) {
            return { ...child, checked: completed };
          } else {
            return child;
          }
        });

        const allChildrenChecked = group.childrens.every((child: Child) => child.checked);
        group.checked = allChildrenChecked;

        this.setIndeterminate(group);
        this.emitDataChange();
      }
    }
  }

  public setIndeterminate(group: Group): boolean {
    if (group.childrens == null || group == null) {
      return false;
    }

    this.emitDataChange();
    return group.childrens.filter((child: Child) => child.checked).length > 0 && group.childrens.filter((child: Child) => child.checked).length < group.childrens.length;
  }
  public setAllItemsGroup(completed: boolean, groupId: string) {
    for (let group of this.mainArray) {
      if (group.id === groupId) {
        group.childrens = group?.childrens?.map((child: Child) => {
          return { ...child, checked: completed };
        })
      }
    }
    this.emitDataChange();
  }

  public checkIfAnyCheckboxChecked(): void {
    this.allCheckboxesChecked = this.mainArray.some(group => group.childrens.some(child => child.checked));
  }

  private resetCheckBoxes() {
    this.mainArray.forEach((group: Group) => {
      group.checked = false;
      group.expandableClosed = true;
      group?.childrens?.forEach((child: Child) => {
        if (child?.checked) {
          child.checked = false;
        }
      });
    });
  }
  
  
  public ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.complete();
    this.resetCheckBoxes();
  }

}