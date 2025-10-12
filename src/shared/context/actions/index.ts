import { ILonLat } from '@/components/molecules/maps/maps';
import { ESetValue } from './actions.type';

export const setFarmerlandFormMaps = (loc?: ILonLat) => {
  return {
    type: ESetValue.SET_FARMERLAND_FORM_MAPS,
    payload: loc,
  };
};
