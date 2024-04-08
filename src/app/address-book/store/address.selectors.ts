import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Email, ICounterpartsList } from '../models/address-interface';

export const typeKey = 'address-lists';

export interface FeatureState {
    data: [];
    createdInvites: [];

}

export interface AppState {
    data: [];
    createdInvites: [];
}

export const selectAddressListState =
    createFeatureSelector<FeatureState>(typeKey);

export const selectAddressList = createSelector(
    selectAddressListState,
    (state: FeatureState) => state.data
);

export const selectInvitedList = createSelector(
    selectAddressListState,
    (state: FeatureState) => state.createdInvites
);