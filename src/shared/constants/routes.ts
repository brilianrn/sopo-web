export enum Routes {
  CATEGORY = "/category",
  FARMER = "/farmer",
  DOCUMENT = "/document",
  FARMERLAND = "/farmerland",
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
  detail: (id: string) => `${Routes.FARMERLAND}/${id}`,
};
