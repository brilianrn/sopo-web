import { ELoginType } from './request';

export type TGender = 'MALE' | 'FEMALE';

export interface IUser {
  id: string;
  email?: string | null;
  phone?: string | null;
  name?: string | null;
  gender?: TGender | null;
  role?: string;
}

export interface IResponseLogin {
  token: string;
  user: IUser;
}

export interface ILoginFirst {
  token: string;
  expiredAt: string;
}

export interface IOtpInfo {
  id?: number;
  email?: string;
  phone?: string;
  expiredAt?: string;
  method?: ELoginType.EMAIL | ELoginType.WHATSAPP | ELoginType.SMS;
}

export interface IResponseVerifyOtp {
  token: string;
  user: IResponseUserVerifyOtp;
}

export interface IResponseUserVerifyOtp {
  id: string;
  email?: string;
  phone?: string;
  avatar?: string;
  name: string;
  gender?: 'MALE' | 'FEMALE';
  role?: string;
}
