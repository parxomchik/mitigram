import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Child, ICounterpartsList } from '../models/address-interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  http = inject(HttpClient)
  getAddressBook(): Observable<ICounterpartsList> {
    return this.http.get<ICounterpartsList>('assets/address-list.json');
  }
}
