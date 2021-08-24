import { ActionReducerMap } from '@ngrx/store';
import * as userReducer from './user/user.reducers';


export interface AppState {
    user: userReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    user: userReducer.userReducer,
};
