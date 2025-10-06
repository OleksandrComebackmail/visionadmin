import type { ReactNode } from "react";
import {
  Layout as RALayout,
  CheckForApplicationUpdate,
  AppBar,
  AppBarProps,
  Sidebar,
  SidebarProps,
} from "react-admin";
import { useTheme } from "@mui/material/styles";

const GreenAppBar = (props: AppBarProps) => (
  <AppBar
    {...props}
    sx={{
      "& .RaAppBar-toolbar": {
        backgroundColor: "#1B272A",
      },
    }}
  />
);

const CustomSidebar = (props: SidebarProps) => (
  <Sidebar
    {...props}
    sx={{
      "&.RaSidebar-root": {
        backgroundColor: "#202E32",
        boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.2)",
      },
      "& .MuiDrawer-paper": {
        backgroundColor: "#202E32",
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

export const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <RALayout
      appBar={GreenAppBar}
      sidebar={CustomSidebar}
      sx={{
        "& .RaLayout-content": {
          backgroundColor: isDarkMode ? "#141E21" : "#F8F9FA",
        },
      }}
    >
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
};
