import type { ReactNode } from "react";
import {
  Layout as RALayout,
  CheckForApplicationUpdate,
  AppBar,
  AppBarProps,
  Sidebar,
  SidebarProps,
} from "react-admin";

const GreenAppBar = (props: AppBarProps) => (
  <AppBar
    {...props}
    sx={{
      "& .RaAppBar-toolbar": {
        backgroundColor: "rgba(27, 39, 42, 1)",
      },
    }}
  />
);

const CustomSidebar = (props: SidebarProps) => (
  <Sidebar
    {...props}
    sx={{
      "&.RaSidebar-root": {
        backgroundColor: "rgba(27, 39, 42, 0.9)",
        boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.2)",
      },
      "& .MuiDrawer-paper": {
        backgroundColor: "rgba(27, 39, 42, 0.9)",
        boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.2)",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white",
        },
        "& .MuiTypography-root": {
          color: "white",
        },
        "& a": {
          color: "white",
        },
        "& svg": {
          color: "white",
        },
      },
      "& .MuiDrawer-root": {
        backgroundColor: "rgba(27, 39, 42, 0.9)",
      },
    }}
  />
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout
    appBar={GreenAppBar}
    sidebar={CustomSidebar}
    sx={{
      "& .RaLayout-content": {
        backgroundColor: "#C2D5DA",
      },
    }}
  >
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
