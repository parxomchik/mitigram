import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AddressActions from './address.actions';
import { AddressService } from '../services/address.service';
import { ToastService } from '../../shared/services/toaster-services';

@Injectable()
export class AddressEffects {

  toastService =inject(ToastService);
  actions$ = inject(Actions);
  addressService = inject(AddressService);

  loadAddressBook$ = createEffect(() => this.actions$.pipe(
    ofType(AddressActions.loadAddressBook),
    switchMap(() => this.addressService.getAddressBook()
      .pipe(
        map(addressBook => AddressActions.setAddressBook({ addressBook })),
        catchError(error => of(AddressActions.setAddressBookError({ error })))
      ))
    )
  );


  createInvite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.createInvite),
      switchMap(({ newInvites }) =>
        of(newInvites).pipe(
          map(() => AddressActions.createInviteSuccess({createdInvites: newInvites})),
          catchError(error => of(AddressActions.createInviteFailure({ error })))
        )
      )
    )
  );

  createInviteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AddressActions.createInviteSuccess,
      ),
      tap(() => {
        this.toastService.openSnackBar('Invites send successful', 'successful', 'top')
      })
    ),
    { dispatch: false }
  );
}
