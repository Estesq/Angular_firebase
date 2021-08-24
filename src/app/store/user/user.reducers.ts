import * as UserActions from './user.actions';

import {UserInterface} from '../../shared/models/user.interface';
import { Action } from '@ngrx/store';

export interface State {
  user: UserInterface | undefined,
  userModel: UserInterface | undefined,
 // error:string,
}

const initialState: State = {
  user: undefined,
  userModel: undefined,
}

/* export function userReducer2(state:string = 'initialState', action: Action) { 
  console.log(action.type,state)
  switch (action.type) {

    case UserActions.LOAD_USER:
      return state='Hello Munda'
    
    default:
      return state;
  }
} */


export function userReducer(state = initialState, action: UserActions.UserActions) {
 // console.log(action.type,state)
  switch (action.type) {

    case UserActions.LOAD_USER:
      return{
        ...state,
        userModel: action.payload,
      }


    //Avove

    case UserActions.UPDATE_USER:
      return {
        ...state,
        // user: action.payload,
      };
    case UserActions.UPDATE_USER_MODEL:
      return {
        ...state,
        userModel: action.payload
      };
    case UserActions.LOGOUT_USER:
      return {
        user: undefined,
        userModel: undefined,
      };
    default:
      return state;
  }
} 
