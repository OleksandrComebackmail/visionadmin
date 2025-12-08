import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  TopToolbar,
  ListButton,
  ShowButton,
  Toolbar,
  SaveButton,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { ImageUploadField } from "@/resources/categories/ImageUploadField.tsx";
import { HtmlTextInput } from "@/components/HtmlTextInput";

const TeamEditActions = () => (
  <TopToolbar>
    <ShowButton />
    <ListButton />
  </TopToolbar>
);

const TeamEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

export const TeamEdit = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Edit
      actions={<TeamEditActions />}
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
        toolbar={<TeamEditToolbar />}
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
        <TextInput source="fullName" label="Full Name" fullWidth />
        <TextInput source="position" fullWidth />
        <HtmlTextInput
          source="shortDescription"
          label="Short Description"
          multiline
          rows={3}
          fullWidth
        />
        <HtmlTextInput
          source="description"
          label="Description"
          multiline
          rows={6}
          fullWidth
        />
        <ImageUploadField source="avatar" label="Upload author's Image" />
        <NumberInput source="sortOrder" label="Sort Order" defaultValue={1} />
      </SimpleForm>
    </Edit>
  );
};
