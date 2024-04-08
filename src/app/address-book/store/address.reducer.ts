import { Action, createReducer, on } from '@ngrx/store';
import * as AddressActions from './address.actions';
import { Email, ICounterpartsList } from '../models/address-interface';

export interface AddressState {
  data: ICounterpartsList;
  createdInvites: ICounterpartsList | Email[];
  loading: boolean;
}

export const initialState: AddressState = {
  data: [],
  createdInvites: [],
  loading: false,
};

export const addressReducer = createReducer(
  initialState,
  on(AddressActions.loadAddressBook, state => ({ ...state, loading: true })),
  on(AddressActions.setAddressBook, (state, { addressBook }) => ({ ...state, data: addressBook, loading: false })),
  on(AddressActions.setAddressBookError, (state, { error }) => ({ ...state, error, loading: false })),

  on(AddressActions.createInvite, state => ({ ...state, loading: true })),
  on(AddressActions.createInviteSuccess, (state , {createdInvites}) => ({ ...state, createdInvites: createdInvites, loading: false })),
  on(AddressActions.createInviteFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export function AddressBookReducer(state: AddressState, action: Action) {
  return addressReducer(state, action);
}