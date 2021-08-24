import { Pipe, PipeTransform } from '@angular/core';
import {DriverInterface} from '../models/driver.interface';

@Pipe({
  name: 'driverStatusSearchPipe'
})
export class DriverStatusSearchPipe implements PipeTransform {
  transform(drivers: DriverInterface[], status = ''): any {
    if (!status.trim()) {
      return drivers
    }

    return drivers.filter( driver =>
      driver.status === status
    )
  }
}
