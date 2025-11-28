import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ArrayField,
  Datagrid,
  UrlField,
} from "react-admin";

export const EpisodeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" label="Episode Name" />
      <TextField source="description" />
      <TextField source="imageUrl" label="Cover Image URL" />
      <ArrayField source="links" label="Video Links">
        <Datagrid bulkActionButtons={false}>
          <TextField source="platform" />
          <UrlField source="url" />
        </Datagrid>
      </ArrayField>
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </SimpleShowLayout>
  </Show>
);
