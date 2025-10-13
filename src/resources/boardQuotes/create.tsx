import { Create, SimpleForm, TextInput, required } from "react-admin";

export const BoardQuoteCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput
        source="text"
        validate={[required()]}
        multiline
        fullWidth
        helperText="Enter the quote text"
      />
    </SimpleForm>
  </Create>
);
