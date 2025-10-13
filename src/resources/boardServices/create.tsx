import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  SelectInput,
} from "react-admin";

export const BoardServiceCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput
        source="name"
        validate={[required()]}
        fullWidth
        helperText="Enter the service name (e.g. Pro Plan)"
      />
      <TextInput
        source="description"
        validate={[required()]}
        multiline
        fullWidth
        helperText="Enter the service description"
      />
      <NumberInput
        source="price"
        validate={[required()]}
        helperText="Enter the price in cents (e.g. 1500 for $15.00)"
      />
      <SelectInput
        source="currency"
        validate={[required()]}
        choices={[
          { id: "usd", name: "USD" },
          { id: "eur", name: "EUR" },
          { id: "gbp", name: "GBP" },
        ]}
        defaultValue="usd"
        helperText="Select the currency"
      />
      <NumberInput
        source="boardsLimit"
        validate={[required()]}
        helperText="Enter the maximum number of boards allowed"
      />
    </SimpleForm>
  </Create>
);
