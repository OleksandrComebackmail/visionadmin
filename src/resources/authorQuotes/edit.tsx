import { Edit, SimpleForm, TextInput, required } from "react-admin";
import { ImageUploadField } from "../categories/ImageUploadField.tsx";

export const AuthorQuoteEdit = () => (
  <Edit
    redirect="list"
    sx={{
      "& .MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-desktopToolbar.css-1wqk5af-MuiToolbar-root-RaToolbar-root":
        {
          backgroundColor: "#E8F5F2",
        },
    }}
  >
    <SimpleForm>
      <TextInput
        source="text"
        validate={[required()]}
        multiline
        fullWidth
        helperText="Edit the quote text"
      />
      <TextInput
        source="author"
        validate={[required()]}
        fullWidth
        helperText="Edit the author's name"
      />
      <TextInput
        source="title"
        fullWidth
        helperText="Edit the author's title or description"
      />
      <TextInput source="imageUrl" label="Image" fullWidth />
      <ImageUploadField source="imageUrl" label="Upload author's Image" />
    </SimpleForm>
  </Edit>
);
