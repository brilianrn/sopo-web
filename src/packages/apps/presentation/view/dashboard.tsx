import {
  AppsBanner,
  AppsCategory,
  AppsDocuments,
  AppsNearestFarmer,
  AppsNearestFarmerland,
  AppsPopularProduct,
} from "@/components/organisms";

export const AppsDashboardView = () => {
  return (
    <div className="space-y-4 pb-4">
      <AppsBanner />
      <div className="mt-6">
        <AppsCategory />
      </div>
      <AppsDocuments />
      <div className="block">
        <AppsNearestFarmerland />
        <AppsNearestFarmer />
        <AppsPopularProduct />
      </div>
    </div>
  );
};
