import {
  BooleanInput,
  Create,
  SimpleForm,
  TextInput,
  useRedirect,
} from "react-admin";
import { ImageUploadField } from "./ImageUploadField";

export const CategoryCreate = () => {
  const redirect = useRedirect();

  const handleSuccess = () => {
    redirect("list", "categories");
  };

  return (
    <Create mutationOptions={{ onSuccess: handleSuccess }}>
      <SimpleForm>
        <TextInput source="name" label="Name" required />
        <TextInput source="description" label="Description" multiline />
        <TextInput source="imageUrl" label="Image" fullWidth />
        <ImageUploadField source="imageUrl" label="Upload Category Image" />
        <BooleanInput source="isDraft" label="Draft" />
      </SimpleForm>
    </Create>
  );
};
