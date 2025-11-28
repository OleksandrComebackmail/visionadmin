import { Edit, SimpleForm, TextInput, FileInput, FileField } from "react-admin";
import { TipTapAdminInput } from "@/components/TipTapAdminInput";

export const TeamEdit = () => {
  const handleSave = (data: Record<string, unknown>) => {
    console.log("💾 SAVE - Full Request Body:", JSON.stringify(data, null, 2));
    console.log("💾 SAVE - Bio HTML:", data.bio);
  };

  return (
    <Edit>
      <SimpleForm onSubmit={handleSave}>
        <TextInput source="name" fullWidth />

        <FileInput
          source="photo"
          label="Team Member Photo"
          accept={["image/*"]}
        >
          <FileField source="src" title="title" />
        </FileInput>

        <TipTapAdminInput source="bio" label="Bio (HTML)" />
      </SimpleForm>
    </Edit>
  );
};
