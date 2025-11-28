import { useState, useEffect } from "react";
import { useInput } from "react-admin";
import { TextField as MuiTextField } from "@mui/material";

interface HtmlTextInputProps {
  source: string;
  label?: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
}

export const HtmlTextInput = ({
  source,
  label,
  multiline,
  rows,
  fullWidth,
}: HtmlTextInputProps) => {
  const { field } = useInput({ source });

  // Convert HTML to plain text for display
  const htmlToText = (html: string): string => {
    if (!html) return "";

    // Check if it's already HTML (contains div or br tags)
    if (html.includes("<div>") || html.includes("<br")) {
      // Remove div tags and convert <br> to newlines
      return html
        .replace(/<div>/gi, "")
        .replace(/<\/div>/gi, "")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/&nbsp;/g, " ")
        .trim();
    }

    // If it's plain text, just return it
    return html;
  };

  // Convert plain text to HTML with div wrapper
  const textToHtml = (text: string): string => {
    if (!text) return "";
    // Wrap the entire content in a div and replace newlines with <br>
    return `<div>${text.replace(/\n/g, "<br>")}</div>`;
  };

  // Use local state to preserve newlines during editing
  const [localValue, setLocalValue] = useState(() =>
    htmlToText(field.value || ""),
  );
  const [isEditing, setIsEditing] = useState(false);

  // Update local value when field value changes from outside (e.g., form load)
  // But not while user is actively editing
  useEffect(() => {
    if (!isEditing) {
      setLocalValue(htmlToText(field.value || ""));
    }
  }, [field.value, isEditing]);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // Just update local state, preserve newlines
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    // Convert to HTML and save to form on blur
    const htmlValue = textToHtml(localValue);
    field.onChange(htmlValue);
    field.onBlur();
    setIsEditing(false);
  };

  return (
    <MuiTextField
      name={field.name}
      value={localValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      label={label}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      variant="outlined"
      margin="normal"
    />
  );
};
