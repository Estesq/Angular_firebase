import { Pipe, PipeTransform } from '@angular/core';
import {DriverInterface} from '../models/driver.interface';

@Pipe({
  name: 'driverSearchPipe'
})
export class DriverSearchPipe implements PipeTransform {
  transform(drivers: DriverInterface[], name = ''): any {
    if (!name.trim()) {
      return drivers
    }
    const nameWords = name.split(" ");

    return drivers.filter( driver => {
      for (let nameWord of nameWords) {
        if(
          driver.firstName?.toLowerCase().includes(nameWord.toLocaleLowerCase())
          || driver?.lastName.toLowerCase().includes(nameWord.toLocaleLowerCase())
        ) {
          return true;
        }
      }
      return false;
    })
  }
}
