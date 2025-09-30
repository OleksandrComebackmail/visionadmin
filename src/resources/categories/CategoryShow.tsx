import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  BooleanField,
  ImageField,
} from "react-admin";

export const CategoryShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <ImageField source="imageUrl" />
      <BooleanField source="isDraft" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </SimpleShowLayout>
  </Show>
);
