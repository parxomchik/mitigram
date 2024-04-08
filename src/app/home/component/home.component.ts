import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, filter, takeUntil } from 'rxjs';
import { Child, Group, ICounterpartsList, IDialogData, IGroupList } from '../../address-book/models/address-interface';
import { DialogComponent } from '../../address-book/dialog/dialog.component';
import { DATA_TABLE } from '../mocks/table.mocks';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @Input() addressBookList!: ICounterpartsList | null;
  @Input() selectInvitedList!: ICounterpartsList | null;

  @Output() createInvite = new EventEmitter();

  displayedColumns: string[] = ['name', 'phone', 'email', 'groups', 'setting'];
  dataSource: MatTableDataSource<Child> = new MatTableDataSource<Child>([DATA_TABLE]);

  dialog = inject(MatDialog);

  restructuredData: IGroupList = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private unsubscribeAll$ = new Subject();

  ngOnChanges({ addressBookList, selectInvitedList }: SimpleChanges): void {
    if (addressBookList?.currentValue && !addressBookList?.firstChange) {
      this.reMapArray(addressBookList.currentValue);
    }

    if (selectInvitedList?.currentValue && !selectInvitedList?.firstChange) {
      this.dataSource.data = [...this.dataSource.data, ...selectInvitedList.currentValue];
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public reMapArray(data: ICounterpartsList): void {

    data.forEach((person: Child) => {
      if (person.groups && person.groups.length > 0) {
        person.groups.forEach((group: string) => {
          let groupObj = this.restructuredData.find((item: Group) => item.name === group);
          if (!groupObj) {
            groupObj = {
              name: group,
              checked: false,
              expandableClosed: true,
              id: this.generateRandomId(),
              childrens: []
            };
            this.restructuredData.push(groupObj);
          }

          // Add the user as a child of the group
          groupObj.childrens.push({
            ...person,
            checked: false,
            id: this.generateRandomId(),
          });
        });
      }
    });
  }

  public openModal() {
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        result: this.restructuredData
      },
    }).afterClosed()
      .pipe(
        filter((data: IDialogData) => !!data?.result),
        takeUntil(this.unsubscribeAll$)
      )
      .subscribe((data) => {
        this.createInvite.emit(data)
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  generateRandomId = (() => {
    const hexDigits = '0123456789abcdef';
    let id = '';

    for (let i = 0; i < 32; i++) {
      if ([8, 12, 16, 20].includes(i)) {
        id += '-';
      }
      id += hexDigits[Math.floor(Math.random() * 16)];
    }

    return id;
  })
  ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.complete();
  }
}
