import { ILonLat } from '@/components/molecules/maps/maps';
import { ESetValue } from '../actions/actions.type';
import { IState } from './reducer';

export const initialState: IState = {
  farmerlandFormMaps: undefined,
};

export const reducer = (state: IState, action: { type: ESetValue; payload?: unknown }): IState => {
  switch (action.type) {
    case ESetValue.SET_FARMERLAND_FORM_MAPS:
      return { ...state, farmerlandFormMaps: action?.payload as ILonLat };
    default:
      throw new Error();
  }
};
