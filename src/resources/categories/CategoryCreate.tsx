import { Create, SimpleForm, TextInput, BooleanInput } from "react-admin";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Name" required />
      <TextInput source="description" label="Description" multiline />
      <TextInput source="imageUrl" label="Image URL" />
      <BooleanInput source="isDraft" label="Draft" />
    </SimpleForm>
  </Create>
);
