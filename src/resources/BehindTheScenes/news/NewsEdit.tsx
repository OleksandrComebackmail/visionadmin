import { Edit, SimpleForm, TextInput, required } from "react-admin";
// Імпортуємо ваш компонент
import { TipTapAdminInput } from "@/components/TipTapAdminInput";
import { ImageUploadField } from "@/resources/categories/ImageUploadField.tsx"; // Перевірте шлях імпорту

export const NewsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" fullWidth validate={required()} />
      <TextInput source="preview" label="Preview Image URL" fullWidth />
      <ImageUploadField source="preview" label="Preview" />
      <TextInput
        source="description"
        fullWidth
        multiline
        rows={2}
        label="Short Description"
      />

      {/* Замінили TextInput на TipTapAdminInput */}
      <TipTapAdminInput source="content" label="Content" />
    </SimpleForm>
  </Edit>
);
