import {
  Show,
  SimpleShowLayout,
  TextField,
  ImageField,
  RichTextField,
} from "react-admin";

export const NewsShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" variant="h5" />
      <ImageField source="preview" sx={{ "& img": { maxHeight: 300 } }} />
      <TextField source="description" />
      {/* Виводить HTML контент */}
      <RichTextField source="content" />
    </SimpleShowLayout>
  </Show>
);
