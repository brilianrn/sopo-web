import { z } from 'zod';
import { validationMessage } from '../../../../shared/constants';

export const FormFarmerlandSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  image: z.optional(z.string()),
  label: z.string().nonempty(validationMessage('Label lahan').required()),
  width: z.number(validationMessage('Lebar lahan').required()),
  length: z.number(validationMessage('Panjang lahan').required()),
  lng: z.number(validationMessage('Longitude').required()),
  lat: z.number(validationMessage('Latitude').required()),
  provinceCode: z.string(validationMessage('Provinsi').required()),
  provinceName: z.optional(z.string()),
  regencyCode: z.string(validationMessage('Kota').required()),
  regencyName: z.optional(z.string()),
  districtCode: z.string(validationMessage('Kecamatan').required()),
  districtName: z.optional(z.string()),
  villageCode: z.string(validationMessage('Kelurahan').required()),
  villageName: z.optional(z.string()),
  locationDetail: z.string(validationMessage('Detail lokasi').required()),
});
