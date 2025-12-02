import { Show, SimpleShowLayout, TextField, ImageField } from "react-admin";

export const TeamShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <ImageField source="photo" />
      <TextField source="bio" />
    </SimpleShowLayout>
  </Show>
);
