import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  ShowButton,
} from "react-admin";

export const UsersList = () => (
  <List perPage={10}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="firstName" label="First Name" />
      <TextField source="lastName" label="Last Name" />
      <EmailField source="email" label="Email" />
      <TextField source="phone" label="Phone" />
      <TextField source="city" label="City" />
      <TextField source="state" label="State" />
      <DateField source="createdAt" label="Registration Date" showTime />
      <DateField source="updatedAt" label="Last Update" showTime />
      <ShowButton />
    </Datagrid>
  </List>
);
