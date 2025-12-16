import {
  ShowBase,
  ShowView,
  SimpleShowLayout,
  TextField,
  ImageField,
  EditButton,
  TopToolbar,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { HtmlField } from "@/components/HtmlField";

const HowItWorksShowActions = () => (
  <TopToolbar>
    <EditButton resource="how-it-work" />
  </TopToolbar>
);

export const HowItWorksShow = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <ShowBase resource="how-it-work" id="how-it-work-page-id">
      <ShowView
        actions={<HowItWorksShowActions />}
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
          <TextField source="title" label="Title:" />
          <ImageField
            source="preview"
            label="Preview Image:"
            sx={{
              "& img": {
                width: "300px !important",
                height: "auto !important",
                borderRadius: "8px",
              },
            }}
          />
          <HtmlField source="description" label="Description:" />
        </SimpleShowLayout>
      </ShowView>
    </ShowBase>
  );
};
