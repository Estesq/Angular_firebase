import { Pipe, PipeTransform } from '@angular/core';
import {TruckInterface} from '../models/truck.interface';

@Pipe({
  name: 'truckStatusSearchPipe'
})
export class TruckStatusSearchPipe implements PipeTransform {
  transform(trucks: TruckInterface[], status = ''): any {
    if (!status.trim()) {
      return trucks
    }

    return trucks.filter( truck =>
      truck.status === status
    )
  }
}
