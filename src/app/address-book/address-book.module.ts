import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AddressBookReducer } from './store/address.reducer';
import { AddressEffects } from './store/address.effects';
import { typeKey } from './store/address.selectors';
import { AddressModalDialog } from './address-modal/address-modal.component';
import { SharedModule } from '../shared/shared.module';
import { AddressEmailDialog } from './address-email-modal/address-email-dialog.component';
import { MaterialModule } from '../shared/material.module';
import { DialogComponent } from './dialog/dialog.component';
@NgModule({
  declarations: [
    AddressModalDialog,
    AddressEmailDialog,
    DialogComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature(typeKey, AddressBookReducer),
    EffectsModule.forFeature([AddressEffects]),
  ]
})
export class AddressBookModule { }