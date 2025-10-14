export enum ERouteServerPrefix {
  API = '/api',
}

export const regionRouteServer = {
  province: `${ERouteServerPrefix.API}/region/province`,
  regency: `${ERouteServerPrefix.API}/region/regency`,
  district: `${ERouteServerPrefix.API}/region/district`,
  village: `${ERouteServerPrefix.API}/region/village`,
};

export const authRouteServer = {
  register: `${ERouteServerPrefix.API}/auth/register`,
  registerFullForm: (token: string) => `${ERouteServerPrefix.API}/auth/register/${token}`,
};

export const roleRouteServer = {
  lov: `${ERouteServerPrefix.API}/role/lov`,
};
