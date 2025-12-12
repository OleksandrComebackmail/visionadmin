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

const ContactUsEditActions = () => (
  <TopToolbar>
    <ShowButton />
  </TopToolbar>
);

const ContactUsEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

export const ContactUsEdit = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const { data, isLoading } = useGetOne("contact", { id: "contact-page-id" });

  if (isLoading) return null;

  return (
    <Edit
      resource="contact"
      redirect="show"
      id={data?.id ?? "contact-page-id"}
      actions={<ContactUsEditActions />}
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
        toolbar={<ContactUsEditToolbar />}
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
        <TextInput
          source="description"
          label="Description"
          fullWidth
          multiline
          rows={4}
        />
      </SimpleForm>
    </Edit>
  );
};
