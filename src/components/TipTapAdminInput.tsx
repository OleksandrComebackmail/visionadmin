import React, { useCallback } from "react";
import { useInput } from "react-admin";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

interface TipTapAdminInputProps {
  source: string;
  label?: string;
}

export const TipTapAdminInput: React.FC<TipTapAdminInputProps> = ({
  source,
}) => {
  const { field } = useInput({ source });

  const handleJsonUpdate = useCallback((json: object) => {
    console.log("📝 Editor JSON Content:", JSON.stringify(json, null, 2));
  }, []);

  return (
    <SimpleEditor
      content={String(field.value ?? "")}
      onUpdate={(html: string) => field.onChange(html)}
      onJsonUpdate={handleJsonUpdate}
      className="tiptap-ra-wrapper"
    />
  );
};
