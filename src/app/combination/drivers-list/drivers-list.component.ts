import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements OnInit {
  drivers = [
    {
      name: 'Leslie Alexander',
      phone: '(406) 555-0120',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
    {
      name: 'Leslie  ',
      phone: '(406) 555-0120',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
    {
      name: 'Leslie Alexander',
      phone: '(406) 555-0120',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
    {
      name: 'Leslie ',
      phone: '(406) 555-0120',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
    {
      name: 'Leslie Alexander',
      phone: '(406) 555-0120',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
    {
      name: 'Leslie ',
      phone: '(406) 555-0120',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
    {
      name: 'Leslie Alexander',
      phone: '(406) 555-0120',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
    {
      name: 'Leslie',
      phone: '(406) 555-0120',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
    {
      name: 'Leslie Alexander',
      phone: '(406) 555-0120',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
