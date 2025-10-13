import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  BooleanField,
  TopToolbar,
  ListButton,
} from "react-admin";
import ForceDeleteButton from "./ForceDeleteButton";

const ShowActions = () => (
  <TopToolbar>
    <ListButton />
    <ForceDeleteButton />
  </TopToolbar>
);

export const BoardServiceShow = () => (
  <Show actions={<ShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <NumberField
        source="price"
        options={{ style: "currency", currency: "USD" }}
        locales="en-US"
        transform={(v) => v / 100}
      />
      <TextField source="currency" />
      <NumberField source="boardsLimit" label="Boards Limit" />
      <BooleanField source="isActive" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </SimpleShowLayout>
  </Show>
);
