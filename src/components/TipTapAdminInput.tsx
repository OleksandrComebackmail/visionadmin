import React from "react";
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

  return (
    <SimpleEditor
      content={String(field.value ?? "")}
      onUpdate={(html: string) => field.onChange(html)}
      className="tiptap-ra-wrapper"
    />
  );
};
