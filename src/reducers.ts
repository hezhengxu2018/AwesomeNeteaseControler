import {IState} from './store';

export interface Iaction {
  type: 'SET_MUSIC_INFO' | 'SET_PLAY_STATE';
  payload: any;
}

export default function rootReducer(state: IState, action: Iaction) {
  switch (action.type) {
    case 'SET_MUSIC_INFO':
      return {...state, musicInfo: action.payload as IState['musicInfo']};
    case 'SET_PLAY_STATE':
      return {...state, playState: action.payload as boolean};
    default:
      return state;
  }
}
