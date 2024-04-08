import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './component/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './container/home-page.component';
import { StoreModule } from '@ngrx/store';
import { typeKey } from '../address-book/store/address.selectors';
import { AddressBookReducer } from '../address-book/store/address.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AddressEffects } from '../address-book/store/address.effects';
import { FormsModule } from '@angular/forms';
import { AddressBookModule } from '../address-book/address-book.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    AddressBookModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    StoreModule.forFeature(typeKey, AddressBookReducer),
    EffectsModule.forFeature([AddressEffects]),
  ]
})
export class HomeModule { }