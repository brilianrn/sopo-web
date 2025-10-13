import { ILonLat } from '@/components/molecules/maps/maps';
import { TFormFarmerland } from '@/packages/apps/farmerland/domain/request';

export interface IState {
  farmerlandFormMaps?: ILonLat;
  farmerlandForm?: TFormFarmerland;
}
