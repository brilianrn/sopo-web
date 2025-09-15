import {
  AppsBanner,
  AppsCategory,
  AppsDocuments,
} from "@/components/organisms";

export const AppsDashboardView = () => {
  return (
    <div className="space-y-4">
      <AppsBanner />
      <AppsCategory />
      <AppsDocuments />
    </div>
  );
};
