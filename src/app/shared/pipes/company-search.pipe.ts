import { Pipe, PipeTransform } from '@angular/core';
import {CompanyInterface} from '../models/company.interface';

@Pipe({
  name: 'companySearchPipe'
})
export class CompanySearchPipe implements PipeTransform {
  transform(companies: CompanyInterface[], name = ''): any {
    if (!name.trim()) {
      return companies
    }

    return companies.filter( strategy => {
      return strategy.name.toLowerCase().includes(name.toLocaleLowerCase())
    })
  }
}
