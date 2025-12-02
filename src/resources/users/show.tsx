import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  DateField,
  useRecordContext,
} from "react-admin";

const UserTitle = () => {
  const record = useRecordContext();
  return (
    <span>User: {record ? `${record.firstName} ${record.lastName}` : ""}</span>
  );
};

export const UserShow = () => (
  <Show title={<UserTitle />}>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="firstName" label="First Name" />
      <TextField source="lastName" label="Last Name" />
      <EmailField source="email" label="Email" />
      <TextField source="phone" label="Phone" />
      <TextField source="city" label="City" />
      <TextField source="state" label="State" />
      <DateField source="createdAt" label="Registration Date" showTime />
      <DateField source="updatedAt" label="Last Update" showTime />
    </SimpleShowLayout>
  </Show>
);
