export enum EPrefix {
  V1 = '/api/v1',
}

export enum EPaths {
  AUTH = `${EPrefix.V1}/auth`,
  USER = `${EPrefix.V1}/user`,
  ROLE = `${EPrefix.V1}/role`,
}

export const authPath = {
  register: `${EPaths.AUTH}/register`,
  registerFullForm: (token: string) => `${EPaths.AUTH}/register/${token}`,
  login: `${EPaths.AUTH}/login`,
  social: `${EPaths.AUTH}/login/:token`,
  verifyOtp: `${EPaths.AUTH}/verify-otp`,
};

export const rolePath = {
  lov: `${EPaths.ROLE}/lov`,
};
