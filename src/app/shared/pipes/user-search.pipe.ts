import { Pipe, PipeTransform } from '@angular/core';
import {UserInterface} from '../models/user.interface';

@Pipe({
  name: 'userSearchPipe'
})
export class UserSearchPipe implements PipeTransform {
  transform(users: UserInterface[], fullName = ''): any {
    if (!fullName.trim()) {
      return users
    }
    const names = fullName.split(" ");

    return users.filter( strategy => {
      for (const name of names) {
        if (strategy.firstName.toLowerCase().includes(name.toLocaleLowerCase())
          || strategy.lastName.toLowerCase().includes(name.toLocaleLowerCase())
        ) {
          return true
        }
      }
      return false
    })
  }
}
