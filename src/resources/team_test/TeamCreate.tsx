import { Create, SimpleForm, TextInput } from "react-admin";

import { TipTapAdminInput } from "@/components/TipTapAdminInput";

export const TeamCreate = () => {
  const onSave = (data: Record<string, unknown>) => {
    console.log("💾 SAVE - Full Request Body:", JSON.stringify(data, null, 2));
    console.log("💾 SAVE - Bio HTML:", data.bio);
  };

  return (
    <Create>
      <SimpleForm onSubmit={onSave}>
        <TextInput source="name" fullWidth />
        <TipTapAdminInput source="bio" />
      </SimpleForm>
    </Create>
  );
};
