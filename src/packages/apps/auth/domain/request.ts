import { z } from 'zod';
import { FirstFormRegisterSchema, FormRegisterSchema, LoginSchema } from '../dto';

export enum ELoginType {
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  SMS = 'SMS',
}

export enum EUserType {
  CUSTOMER = 'customer',
  FARMER = 'farmer',
  BREEDER = 'breeder',
  LAND_OWNER = 'land_owner',
  INVESTOR = 'investor',
  TRAINER_OF_TRAINER = 'trainer_of_trainer',
}

export type TLoginSchema = z.infer<typeof LoginSchema>;

export type TFirstFormRegisterSchema = z.infer<typeof FirstFormRegisterSchema>;

export type TFormRegisterSchema = z.infer<typeof FormRegisterSchema>;

export type OTPPurpose = 'REGISTRATION' | 'LOGIN' | 'FORGOT_PASSWORD';

export interface IRequestVerifyOtp {
  token: string;
  otp: string;
  purpose: OTPPurpose;
}
