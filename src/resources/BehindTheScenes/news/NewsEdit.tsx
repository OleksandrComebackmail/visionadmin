import { Edit, SimpleForm, TextInput, required } from "react-admin";
import { TipTapAdminInput } from "@/components/TipTapAdminInput";
import { ImageUploadField } from "@/resources/categories/ImageUploadField.tsx";

export const NewsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" fullWidth validate={required()} />
      <ImageUploadField source="preview" label="Preview" />
      <TextInput
        source="description"
        fullWidth
        multiline
        rows={2}
        label="Short Description"
      />

      <TipTapAdminInput source="content" label="Content" />
    </SimpleForm>
  </Edit>
);
