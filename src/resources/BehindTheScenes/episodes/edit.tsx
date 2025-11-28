import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
} from "react-admin";

export const EpisodeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="name"
        validate={[required()]}
        fullWidth
        helperText="Episode name"
      />
      <TextInput
        source="description"
        multiline
        fullWidth
        rows={4}
        helperText="Episode description"
      />
      <TextInput source="imageUrl" fullWidth helperText="Cover image URL" />
      <ArrayInput source="links" label="Video Links">
        <SimpleFormIterator inline>
          <SelectInput
            source="platform"
            choices={[
              { id: "youtube", name: "YouTube" },
              { id: "vimeo", name: "Vimeo" },
              { id: "other", name: "Other" },
            ]}
            validate={[required()]}
            helperText="Platform"
          />
          <TextInput
            source="url"
            validate={[required()]}
            fullWidth
            helperText="Video URL"
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
