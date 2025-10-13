import { ILonLat } from '@/components/molecules/maps/maps';
import { TFormFarmerland } from '@/packages/apps/farmerland/domain/request';
import { ESetValue } from '../actions/actions.type';
import { IState } from './reducer';

export const initialState: IState = {
  farmerlandFormMaps: undefined,
  farmerlandForm: undefined,
};

export const reducer = (state: IState, action: { type: ESetValue; payload?: unknown }): IState => {
  switch (action.type) {
    case ESetValue.SET_FARMERLAND_FORM_MAPS:
      return { ...state, farmerlandFormMaps: action?.payload as ILonLat };
    case ESetValue.SET_FARMERLAND_FORM:
      return { ...state, farmerlandForm: action?.payload as TFormFarmerland };
    default:
      throw new Error();
  }
};
