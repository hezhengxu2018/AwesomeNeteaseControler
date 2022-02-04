import {ReactNode} from 'react';
export interface AuxProps {
  children: ReactNode[] | ReactNode;
}
export interface IContextProps {
  state: any;
  dispatch: any;
}
