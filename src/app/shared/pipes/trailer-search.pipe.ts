import { Pipe, PipeTransform } from '@angular/core';
import {TrailerInterface} from '../models/trailer.interface';

@Pipe({
  name: 'trailerSearchPipe'
})
export class TrailerSearchPipe implements PipeTransform {
  transform(trailers: TrailerInterface[], name = ''): any {
    if (!name.trim()) {
      return trailers
    }

    return trailers.filter( trailer => {
      return trailer.id.toLowerCase().includes(name.toLocaleLowerCase())
    })
  }
}
