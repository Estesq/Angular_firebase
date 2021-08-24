import { Pipe, PipeTransform } from '@angular/core';
import {TrailerInterface} from '../models/trailer.interface';

@Pipe({
  name: 'trailerStatusSearchPipe'
})
export class TrailerStatusSearchPipe implements PipeTransform {
  transform(trailers: TrailerInterface[], status = ''): any {
    if (!status.trim()) {
      return trailers
    }

    return trailers.filter( trailer =>
      trailer.status === status
    )
  }
}
