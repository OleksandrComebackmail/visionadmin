import {
  Show,
  SimpleShowLayout,
  TextField,
  ImageField,
  RichTextField,
} from "react-admin";

export const NewsShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" variant="h5" />
      <TextField source="description" />
      <ImageField
        source="preview"
        sx={{
          "& .RaImageField-image": {
            width: "60%",
            height: "auto",
            objectPosition: "left",
          },
        }}
      />
      <RichTextField source="content" sx={{ "& img": { maxWidth: "60%" } }} />
    </SimpleShowLayout>
  </Show>
);
