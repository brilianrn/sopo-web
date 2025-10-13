import { validationMessage } from '@/shared/constants';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';
import { ResponseREST } from './types';

export const response = {
  [HttpStatusCode.Ok]: <T extends Partial<object>>({ code, message, data }: ResponseREST<T>) => {
    return NextResponse.json({
      code: code || HttpStatusCode.Ok,
      message: message || 'Sukses!',
      data,
    });
  },
  [HttpStatusCode.Created]: <T extends Partial<object>>({
    code,
    message,
    data,
  }: ResponseREST<T>) => {
    return NextResponse.json({
      code: code || HttpStatusCode.Created,
      message: message || 'Berhasil dibuat!',
      data,
    });
  },
  [HttpStatusCode.BadRequest]: <T extends Partial<object>>({
    code,
    message,
    data,
  }: ResponseREST<T>) => {
    return NextResponse.json({
      code: code || HttpStatusCode.BadRequest,
      message: message || 'Tidak valid!',
      data,
    });
  },
  [HttpStatusCode.Unauthorized]: <T extends Partial<object>>({
    code,
    message,
    data,
  }: ResponseREST<T>) => {
    return NextResponse.json({
      code: code || HttpStatusCode.Unauthorized,
      message: message || 'Tidak diizinkan!',
      data,
    });
  },
  [HttpStatusCode.Forbidden]: <T extends Partial<object>>({
    code,
    message,
    data,
  }: ResponseREST<T>) => {
    return NextResponse.json({
      code: code || HttpStatusCode.Forbidden,
      message: message || 'Gagal!',
      data,
    });
  },
  [HttpStatusCode.NotFound]: <T extends Partial<object>>({
    code,
    message,
    data,
  }: ResponseREST<T>) => {
    return NextResponse.json({
      code: code || HttpStatusCode.NotFound,
      message: message || 'Tidak ditemukan!',
      data,
    });
  },
  [HttpStatusCode.InternalServerError]: <T extends Partial<object>>(payload?: ResponseREST<T>) => {
    return NextResponse.json({
      code: HttpStatusCode.InternalServerError,
      message: payload?.message || validationMessage()[500],
    });
  },
};
