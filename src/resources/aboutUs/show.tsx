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

const AboutUsShowActions = () => (
  <TopToolbar>
    <EditButton resource="about" />
  </TopToolbar>
);

export const AboutUsShow = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <ShowBase resource="about" id="about-page-id">
      <ShowView
        actions={<AboutUsShowActions />}
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
          <TextField source="description" label="Hero Description:" />

          <ImageField
            source="imageUrl"
            label="Hero Image:"
            sx={{
              "& img": {
                width: "300px !important",
                height: "300px !important",
                borderRadius: "8px",
              },
            }}
          />

          <HtmlField source="aboutUs" label="About Us Context:" disableLabel />
          <HtmlField
            source="ourStory"
            label="Our Story Context:"
            disableLabel
          />
        </SimpleShowLayout>
      </ShowView>
    </ShowBase>
  );
};
