import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ImageField,
} from "react-admin";

export const AuthorQuoteShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="text" />
      <TextField source="author" />
      <TextField source="title" />
      <ImageField source="imageUrl" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </SimpleShowLayout>
  </Show>
);
