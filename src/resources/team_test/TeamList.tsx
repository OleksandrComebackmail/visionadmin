import { List, Datagrid, TextField, ImageField } from "react-admin";

export const TeamList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <ImageField source="photo" label="Photo" />
    </Datagrid>
  </List>
);
