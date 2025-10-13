export enum ERouteServerPrefix {
  API = '/api',
}

export const regionRouteServer = {
  province: `${ERouteServerPrefix.API}/region/province`,
  regency: `${ERouteServerPrefix.API}/region/regency`,
  district: `${ERouteServerPrefix.API}/region/district`,
  village: `${ERouteServerPrefix.API}/region/village`,
};
