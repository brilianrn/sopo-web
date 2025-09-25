import { ELoginType } from "@/packages/apps/auth/domain/request";
import { z } from "zod";
import { validationMessage } from "../constants";
import { isEmail, isPhone } from "../utils";

export const LoginSchema = z.object({
  input: z
    .string()
    .nonempty(validationMessage("Email atau No HP").required())
    .refine(
      (val) => isPhone(val) || isEmail(val),
      validationMessage("Email atau No HP").invalidField()
    ),
  password: z
    .string()
    .min(8, { message: validationMessage("Kata sandi").minChar(8) })
    .refine(
      (val) =>
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(
          val
        ),
      validationMessage("kata sandi").invalidField()
    ),
  type: z.optional(
    z.enum([ELoginType.EMAIL, ELoginType.WHATSAPP, ELoginType.SMS])
  ),
});
