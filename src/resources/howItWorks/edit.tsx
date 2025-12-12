import {
  useGetOne,
  Edit,
  SimpleForm,
  TextInput,
  TopToolbar,
  ShowButton,
  Toolbar,
  SaveButton,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { HtmlTextInput } from "@/components/HtmlTextInput";
import { ImageUploadField } from "@/resources/categories/ImageUploadField";

const HowItWorksEditActions = () => (
  <TopToolbar>
    <ShowButton />
  </TopToolbar>
);

const HowItWorksEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

export const HowItWorksEdit = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const { data, isLoading } = useGetOne("how-it-work", {
    id: "how-it-work-page-id",
  });

  if (isLoading) return null;

  return (
    <Edit
      resource="how-it-work"
      redirect="show"
      id={data?.id ?? "how-it-work-page-id"}
      actions={<HowItWorksEditActions />}
      mutationMode="pessimistic"
      sx={{
        padding: "16px",
        "& .RaEdit-main": {
          boxShadow: isDarkMode
            ? "0 2px 10px rgba(0, 0, 0, 0.3)"
            : "0 2px 10px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          backgroundColor: isDarkMode ? "#263538" : "#E8F5F2",
        },
        "& .RaEdit-card": {
          backgroundColor: isDarkMode ? "#263B3E" : "white",
          borderRadius: "8px",
        },
      }}
    >
      <SimpleForm
        toolbar={<HowItWorksEditToolbar />}
        sx={{
          "& .MuiInputLabel-root": {
            color: isDarkMode ? "#8FD0C8" : "#214849",
          },
          "& .MuiInputBase-root": {
            backgroundColor: isDarkMode ? "#1F3033" : "#F0F9F8",
            color: isDarkMode ? "#ffffff" : "#0a0a0a",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isDarkMode ? "#315754" : "#9BB8B5",
          },
        }}
      >
        <TextInput source="title" label="Title" fullWidth />
        <ImageUploadField source="preview" label="Preview Image" />
        <HtmlTextInput
          source="description"
          label="Description"
          multiline
          rows={6}
          fullWidth
        />
      </SimpleForm>
    </Edit>
  );
};
