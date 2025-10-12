export enum Routes {
  APPS = '/apps',
  CATEGORY = '/apps/category',
  FARMER = '/apps/farmer',
  DOCUMENT = '/apps/document',
  FARMERLAND = '/apps/farmerland',
  AUTH = '/apps/auth',
  HELP_CENTER = '/apps/help-center',
}

export const categoryRoute = {
  index: Routes.CATEGORY,
  detail: (seoTitle: string) => `${Routes.CATEGORY}/${seoTitle}`,
};

export const farmerRoute = {
  index: Routes.FARMER,
  detail: (id: string) => `${Routes.FARMER}/${id}`,
};

export const productDetailRoute = (seoTitle: string) => `/product/${seoTitle}`;

export const documentRoute = {
  index: Routes.DOCUMENT,
  detail: (seoTitle: string) => `${Routes.DOCUMENT}/${seoTitle}`,
};

export const farmerlandRoute = {
  index: Routes.FARMERLAND,
  form: `${Routes.FARMERLAND}/form`,
  formMaps: `${Routes.FARMERLAND}/form/maps`,
  detail: (id: string) => `${Routes.FARMERLAND}/${id}`,
};

export const authRoute = {
  login: `${Routes.AUTH}/login`,
  loginOtp: (token: string) => `${Routes.AUTH}/login/${token}`,
  register: `${Routes.AUTH}/register`,
  registerOtp: (token: string) => `${Routes.AUTH}/register/${token}`,
  registerForm: (token: string) => `${Routes.AUTH}/register/${token}/form`,
  forgotPassword: `${Routes.AUTH}/forgot-password`,
};

export const helpCenterRoute = {
  tnc: `${Routes.HELP_CENTER}/tnc`,
  privacyPolicy: `${Routes.HELP_CENTER}/privacy-policy`,
};
