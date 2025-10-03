import {
  BooleanInput,
  Edit,
  required,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import { ImageUploadField } from "./ImageUploadField";

interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isDraft?: boolean;
}

const CategoryTitle = () => {
  const record = useRecordContext<Category>();
  return <span>Edit Category: {record ? record.name : ""}</span>;
};

export const CategoryEdit = () => (
  <Edit title={<CategoryTitle />}>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={[required()]} />
      <TextInput source="description" label="Description" multiline />
      <TextInput source="imageUrl" label="Image" fullWidth />
      <ImageUploadField source="imageUrl" label="Upload Category Image" />
      <BooleanInput source="isDraft" label="Draft" />
    </SimpleForm>
  </Edit>
);
