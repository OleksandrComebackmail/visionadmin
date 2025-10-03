import {
  List,
  Datagrid,
  TextField as RA_TextField,
  BooleanField,
  DateField,
  DeleteButton,
  ShowButton,
  EditButton,
  ImageField
} from "react-admin";

export const CategoryList = () => (
  <List>
    <Datagrid rowClick="edit" sx={{
      '& .column-isDraft': {
        minWidth: '120px',
        width: '120px'
      }
    }}>
      <RA_TextField source="id" />
      <RA_TextField source="name" />
      <RA_TextField source="description" />
      <ImageField source="imageUrl" />
      <BooleanField
        source="isDraft"
        sx={{
          '& .MuiTableCell-root': {
            minWidth: '120px',
            width: '120px'
          }
        }}
      />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
