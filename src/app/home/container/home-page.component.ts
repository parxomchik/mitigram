import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAddressList, selectInvitedList } from '../../address-book/store/address.selectors';
import { AddressState } from '../../address-book/store/address.reducer';
import * as AddressActions from '../../address-book/store/address.actions';
import { Email, ICounterpartsList, IDialogData, InvitePayload } from '../../address-book/models/address-interface';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  store = inject(Store<AddressState>);

  addressBook$ = this.store.select(selectAddressList);
  selectInvitedList$ = this.store.select(selectInvitedList);

  ngOnInit(): void {
    this.store.dispatch(AddressActions.loadAddressBook());
  }

  public onCreateInvite(dadaDialog: IDialogData): void {
    const newInvites = dadaDialog.data
    this.store.dispatch(AddressActions.createInvite({ newInvites }));
  }
}
