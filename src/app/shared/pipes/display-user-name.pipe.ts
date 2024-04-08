import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from '../../address-book/models/address-interface';

@Pipe({
  name: 'displayUserName'
})
export class DisplayUserNamePipe implements PipeTransform {
  transform(employee: IEmployee) {
    return employee ? `${employee.first} ${employee.last}` : undefined;
  }
}
