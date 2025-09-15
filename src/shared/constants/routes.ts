export enum Routes {
  CATEGORY = "/category",
}

export const categoryRoute = {
  index: Routes.CATEGORY,
  detail: (seoTitle: string) => `${Routes.CATEGORY}/${seoTitle}`,
};
