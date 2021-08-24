import {Input, Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-trailers-list',
  templateUrl: './trailers-list.component.html',
  styleUrls: ['./trailers-list.component.scss']
})
export class TrailersListComponent implements OnInit {
  trailers = [
    {
      id: 'PTLZ273012761',
      type: 'Van',
      weight: '10700 lbs.',
      distance: '1 mi.',
      length: '17 ft.'
    },
    {
      id: 'PTLZ968244728',
      type: 'Auto Carrier',
      weight: '6300 lbs.',
      distance: '1 mi.',
      length: '95 ft.'
    },
    {
      id: 'PTLZ282413676',
      type: 'Tanker Steel',
      weight: '15300 lbs.',
      distance: '12 mi.',
      length: '35 ft.'
    },
    {
      id: 'PTLZ413917168',
      type: 'Van',
      weight: '8200 lbs.',
      distance: '23 mi.',
      length: '47 ft.'
    },
    {
      id: 'PTLZ429221706',
      type: 'Auto Carrier',
      weight: '11700 lbs.',
      distance: '49 mi.',
      length: '10 ft.'
    },
    {
      id: 'PTLZ097341574',
      type: 'Flatbed',
      weight: '10700 lbs.',
      distance: '124 mi.',
      length: '50 ft.'
    },
    {
      id: 'PTLZ979818824',
      type: 'Tanker Steel',
      weight: '8600 lbs.',
      distance: '239 mi.',
      length: '39 ft.'
    },
    {
      id: 'PTLZ282413676',
      type: 'Auto Carrier',
      weight: '5200 lbs.',
      distance: '587 mi.',
      length: '76 ft.'
    },
    {
      id: 'PTLZ413917168',
      type: 'Van',
      weight: '8100 lbs.',
      distance: '517 mi.',
      length: '56 ft.'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
