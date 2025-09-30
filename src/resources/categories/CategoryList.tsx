import {
  List,
  Datagrid,
  TextField as RA_TextField,
  BooleanField,
  DateField,
  DeleteButton,
  ShowButton,
  EditButton,
} from "react-admin";

export const CategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <RA_TextField source="id" />
      <RA_TextField source="name" />
      <RA_TextField source="description" />
      <RA_TextField source="imageUrl" />
      <BooleanField source="isDraft" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
