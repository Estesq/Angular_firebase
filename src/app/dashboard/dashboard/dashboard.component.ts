import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInterface } from 'app/shared/models/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as fromApp from '../../store/user/user.reducers';


interface AppState {
message:string;
// error:string,
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {  

  mes: Observable<any>;
  data: Observable<any[]>;
  userData: any;
;
  user: Observable<any>;    
  constructor(private store:Store<fromApp.State>){

   this.mes=this.store.select('user')
 // this.user=this.store.select('userModel')
  var local = localStorage.getItem('user')
  //console.log(local)
 // console.log(this.user)
}

  // a(){
  //   this.mes.subscribe(a=>{
  //     this.data=a.userModel
  //     console.log(a.userModel)
  //     //console.log(a['userModel'])


  //   })
  //  /// this.store.dispatch(new PostAction.LoadUser(a))
  // } 

  ngOnInit(){
    this.mes.subscribe(a=>{
      this.data=a.userModel
      //console.log(a.userModel)
      //console.log(a['userModel'])
      
    })
  }
}
