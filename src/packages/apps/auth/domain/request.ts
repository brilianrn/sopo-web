import { LoginSchema } from "@/shared/schemas/login.schema";
import {
  FirstFormRegisterSchema,
  FormRegisterSchema,
} from "@/shared/schemas/register.schema";
import { z } from "zod";

export enum ELoginType {
  EMAIL = "email",
  WHATSAPP = "whatsapp",
  SMS = "sms",
}

export enum EUserType {
  CUSTOMER = "customer",
  FARMER = "farmer",
  BREEDER = "breeder",
  LAND_OWNER = "land_owner",
  INVESTOR = "investor",
  TRAINER_OF_TRAINER = "trainer_of_trainer",
}

export type TLoginSchema = z.infer<typeof LoginSchema>;

export type TFirstFormRegisterSchema = z.infer<typeof FirstFormRegisterSchema>;

export type TFormRegisterSchema = z.infer<typeof FormRegisterSchema>;
