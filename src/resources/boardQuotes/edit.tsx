import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const BoardQuoteEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="text"
        validate={[required()]}
        multiline
        fullWidth
        helperText="Edit the quote text"
      />
    </SimpleForm>
  </Edit>
);
