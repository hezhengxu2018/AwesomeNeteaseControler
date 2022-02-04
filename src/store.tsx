import React, {FC, ReactElement, useReducer, createContext} from 'react';
import {AuxProps, IContextProps} from './types';
import rootReducer from './reducers';
export interface IState {
  musicInfo: {
    songTitle: string;
    artist: string;
    albumUrl: string;
  };
  playState: boolean;
}
const initialState: IState = {
  musicInfo: {
    songTitle: '',
    artist: '',
    albumUrl:
      'http://p2.music.126.net/FGYCo9ZtZd-vcOBZXeu-Cg==/109951165868160762.jpg',
  },
  playState: false,
};

export const Store = createContext({} as IContextProps);
export const Provider: FC<AuxProps> = ({children}): ReactElement => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const value = {state, dispatch};
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
