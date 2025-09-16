import {
  AppsBanner,
  AppsCategory,
  AppsDocuments,
  AppsNearestFarmer,
  AppsNearestFarmerland,
} from "@/components/organisms";

export const AppsDashboardView = () => {
  return (
    <div className="space-y-4 pb-4">
      <AppsBanner />
      <AppsCategory />
      <AppsDocuments />
      <div className="block">
        <AppsNearestFarmerland />
        <AppsNearestFarmer />
      </div>
    </div>
  );
};
