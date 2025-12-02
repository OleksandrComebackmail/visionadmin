import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ImageField,
  EditButton,
  TopToolbar,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { HtmlField } from "@/components/HtmlField";

const TeamShowActions = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

export const TeamShow = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Show
      actions={<TeamShowActions />}
      sx={{
        padding: "16px",
        "& .RaShow-main": {
          boxShadow: isDarkMode
            ? "0 2px 10px rgba(0, 0, 0, 0.3)"
            : "0 2px 10px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          backgroundColor: isDarkMode ? "#263538" : "#E8F5F2",
        },
        "& .RaShow-card": {
          backgroundColor: isDarkMode ? "#263B3E" : "white",
          borderRadius: "8px",
        },
      }}
    >
      <SimpleShowLayout
        sx={{
          "& .RaLabeled-label": {
            color: isDarkMode ? "#8FD0C8" : "#214849",
            fontWeight: "500",
            fontSize: "19px",
          },
          "& .MuiTypography-root": {
            color: isDarkMode ? "#ffffff" : "#0a0a0a",
          },
        }}
      >
        <TextField source="fullName" label="Full Name:" />
        <ImageField
          source="avatar"
          label="Avatar:"
          sx={{
            "& img": {
              width: "300px !important",
              height: "300px !important",
              borderRadius: "8px",
            },
          }}
        />
        <HtmlField source="shortDescription" />
        <HtmlField source="description" />

        <TextField source="sortOrder" label="Sort Order:" />
        <DateField source="createdAt" showTime label="Created At:" />
        <DateField source="updatedAt" showTime label="Updated At:" />
      </SimpleShowLayout>
    </Show>
  );
};
