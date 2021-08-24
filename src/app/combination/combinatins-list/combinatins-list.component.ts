import {Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-combinatins-list',
  templateUrl: './combinatins-list.component.html',
  styleUrls: ['./combinatins-list.component.scss']
})
export class CombinatinsListComponent implements OnInit {
  activeCombination: any ;
  combinations = [
    {
      truckId: '#3149',
      type: 'Semi' ,
      truckModel: 'International' ,
      driverName: 'Leslie Alexander',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
    {
      truckId: '#3872',
      type: 'Tanker' ,
      truckModel: 'International' ,
      driverName: 'Leslie Alexander 2',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
    {
      truckId: '#2882',
      type: 'Van' ,
      truckModel: 'Mack' ,
      driverName: 'Leslie Alexander',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
    {
      truckId: '#4185',
      type: 'Semi' ,
      truckModel: 'Freightliner' ,
      driverName: 'Leslie Alexander',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
    {
      truckId: '#5438',
      type: 'Van' ,
      truckModel: 'Volvo' ,
      driverName: 'Leslie Alexander',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
    {
      truckId: '#3351',
      type: 'Flatbed' ,
      truckModel: 'International' ,
      driverName: 'Leslie Alexander',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
    {
      truckId: '#9372',
      type: 'Tanker' ,
      truckModel: 'Volvo' ,
      driverName: 'Leslie Alexander',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
    {
      truckId: '#6958',
      type: 'Flatbed' ,
      truckModel: 'Mack' ,
      driverName: 'Leslie Alexander',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
    {
      truckId: '#1316',
      type: 'Tanker' ,
      truckModel: 'Freightliner' ,
      driverName: 'Leslie Alexander',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
    {
      truckId: '#5980',
      type: 'Van' ,
      truckModel: 'International' ,
      driverName: 'Leslie Alexander',
      trailer: 'PTLZ273012761' ,
      status: 'Active'
    },
  ]
  constructor() { }
  ngOnInit(): void {
  }
  openConnect(combination: object ) {
    if (this.activeCombination !== combination) {
      this.activeCombination = combination;
    } else {
      this.activeCombination = '';
    }
  }
}
