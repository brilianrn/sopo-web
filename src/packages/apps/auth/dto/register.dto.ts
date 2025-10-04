import { ELoginType } from '@/packages/apps/auth/domain/request';
import { z } from 'zod';
import { validationMessage } from '../../../../shared/constants';
import { isEmail, isPhone } from '../../../../shared/utils';

export const FirstFormRegisterSchema = z.object({
  input: z
    .string()
    .nonempty(validationMessage('Email atau No HP').required())
    .refine(
      (val) => isPhone(val) || isEmail(val),
      validationMessage('Email atau No HP').invalidField(),
    ),
  method: z.optional(z.enum([ELoginType.EMAIL, ELoginType.WHATSAPP, ELoginType.SMS])),
  token: z.optional(z.string()),
});

export const FormRegisterSchema = z.object({
  input: z
    .string()
    .nonempty(validationMessage('Email atau No HP').required())
    .refine(
      (val) => isPhone(val) || isEmail(val),
      validationMessage('Email atau No HP').invalidField(),
    ),
  name: z
    .string()
    .nonempty(validationMessage('Nama').required())
    .min(3, { message: validationMessage('Nama').minChar(3) }),
  roleCode: z.string().nonempty(validationMessage('Jenis akun').required()),
  // roleCode: z.enum([
  //   EUserType.CUSTOMER,
  //   EUserType.FARMER,
  //   EUserType.BREEDER,
  //   EUserType.LAND_OWNER,
  //   EUserType.INVESTOR,
  //   EUserType.TRAINER_OF_TRAINER,
  // ]),
  password: z
    .string()
    .min(8, { message: validationMessage('Kata sandi').minChar(8) })
    .refine((val) => /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(val), {
      message: validationMessage('Kata sandi').invalidField(),
    }),
  passwordConfirmation: z
    .string()
    .min(8, { message: validationMessage('Kata sandi').minChar(8) })
    .refine((val) => /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(val), {
      message: validationMessage('Kata sandi').invalidField(),
    }),
  token: z.optional(z.string()),
});
