import { z } from 'zod';
import { FormFarmerlandSchema } from '../dto';

export enum EMapSet {
  SETTLED = 'settled',
}

export type TFormFarmerland = z.infer<typeof FormFarmerlandSchema>;
