import { Action } from '@ngrx/store';
import {UserInterface} from '../../shared/models/user.interface';


export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_MODEL = 'UPDATE_USER_MODEL';
export const LOGOUT_USER = '[POST] LOGOUT_USER';

export const LOAD_USER = '[POST] LOAD_USER';


export class LoadUser implements Action{
  readonly type = LOAD_USER;
  constructor(public payload:UserInterface){}
}

///Above

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor() { }
}

export class UpdateUserModel implements Action {
    readonly type = UPDATE_USER_MODEL;
    constructor(public payload: UserInterface) { }
}


export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
  constructor() { }
}


export type UserActions = UpdateUser | UpdateUserModel | LogoutUser |LoadUser;

