import { AppsLayout } from "@/components/templates/apps-layout";
import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => <AppsLayout>{children}</AppsLayout>;

export default Layout;
