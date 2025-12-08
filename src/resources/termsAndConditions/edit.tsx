import {
  useGetOne,
  Edit,
  SimpleForm,
  TextInput,
  TopToolbar,
  ShowButton,
  Toolbar,
  SaveButton,
  Loading,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { TipTapAdminInput } from "@/components/TipTapAdminInput.tsx";

const TermsEditActions = () => (
  <TopToolbar>
    <ShowButton />
  </TopToolbar>
);

const TermsEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

export const TermsEdit = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const { data, isLoading } = useGetOne("terms", { id: "terms-page-id" });

  if (isLoading) return <Loading />;

  return (
    <Edit
      resource="terms"
      redirect="show"
      id={data?.id ?? "terms-page-id"}
      actions={<TermsEditActions />}
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
        toolbar={<TermsEditToolbar />}
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
        <TipTapAdminInput source="content" label="Content" />
      </SimpleForm>
    </Edit>
  );
};
