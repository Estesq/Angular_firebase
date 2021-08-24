import { Pipe, PipeTransform } from '@angular/core';
import {TruckInterface} from '../models/truck.interface';

@Pipe({
  name: 'truckSearchPipe'
})
export class TruckSearchPipe implements PipeTransform {
  transform(trucks: TruckInterface[], name = ''): any {
    if (!name.trim()) {
      return trucks
    }

    return trucks.filter( truck => {
      return truck.id.toLowerCase().includes(name.toLocaleLowerCase())
    })
  }
}
