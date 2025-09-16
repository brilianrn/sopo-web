export enum Routes {
  CATEGORY = "/category",
  FARMER = "/farmer",
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
