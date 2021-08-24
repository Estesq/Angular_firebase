import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoadInterface} from '../../shared/models/load.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-load-board',
  templateUrl: './load-board.component.html',
  styleUrls: ['./load-board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadBoardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  async routerToLoadInfo() {
    console.log('this.router.navigate');
    // await this.router.navigate([`load/trip-info//${load.id}`]);
    await this.router.navigate([`loads/trip-info/123456`]);
  }

}
