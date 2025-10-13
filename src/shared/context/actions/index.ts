import { ILonLat } from '@/components/molecules/maps/maps';
import { TFormFarmerland } from '@/packages/apps/farmerland/domain/request';
import { ESetValue } from './actions.type';

export const setFarmerlandFormMaps = (loc?: ILonLat) => {
  return { payload: loc, type: ESetValue.SET_FARMERLAND_FORM_MAPS };
};

export const setFarmerlandForm = (payload?: TFormFarmerland) => {
  return { payload, type: ESetValue.SET_FARMERLAND_FORM };
};
