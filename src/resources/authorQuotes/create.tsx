import { Create, SimpleForm, TextInput, required } from "react-admin";
import { ImageUploadField } from "../categories/ImageUploadField.tsx";

export const AuthorQuoteCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput
        source="text"
        validate={[required()]}
        multiline
        fullWidth
        helperText="Enter the quote text"
      />
      <TextInput
        source="author"
        validate={[required()]}
        fullWidth
        helperText="Enter the author's name"
      />
      <TextInput
        source="title"
        fullWidth
        helperText="Enter the author's title or description"
      />
      <TextInput source="imageUrl" label="Image" fullWidth />
      <ImageUploadField source="imageUrl" label="Upload author's Image" />
    </SimpleForm>
  </Create>
);
