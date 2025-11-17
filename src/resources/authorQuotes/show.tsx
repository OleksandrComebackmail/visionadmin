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
      <ImageField source="imageUrl" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </SimpleShowLayout>
  </Show>
);
