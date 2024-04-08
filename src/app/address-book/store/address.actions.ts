import { createAction, props } from '@ngrx/store';
import { Email, ICounterpartsList } from '../models/address-interface';

export const loadAddressBook = createAction('[Address Book] Load Address Book');
export const setAddressBook = createAction('[Address Book] Set Address Book', props<{ addressBook: ICounterpartsList }>());
export const setAddressBookError = createAction('[Address Book] Set Address Book Error', props<{ error: Error }>());


export const createInvite = createAction('[Address Book] Create Invite', props<{ newInvites: ICounterpartsList | Email[] }>());
export const createInviteSuccess = createAction('[Address Book] Create Invite Success', props<{ createdInvites: ICounterpartsList | Email[] }>());
export const createInviteFailure = createAction('[Address Book] Create Invite Error', props<{ error: Error }>());