import ImageIcon from "@mui/icons-material/Image";
import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import {
  Button,
  useInput,
  useNotify,
  useRecordContext,
  useUpdate,
} from "react-admin";

interface ImageUploadFieldProps {
  source: string;
  label: string;
}

const API_URL = "https://api.vision.softwaredoes.com/api/staff";

interface CategoryFormRecord {
  id?: string;
  [key: string]: any;
}

export const ImageUploadField = (props: ImageUploadFieldProps) => {
  const { source, label } = props;
  const record = useRecordContext<CategoryFormRecord>();
  const notify = useNotify();
  const [uploading, setUploading] = useState(false);
  const [update] = useUpdate();

  const { field } = useInput({ source });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageUrl = field.value;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_URL}/categories/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      const newImageUrl = data.imageUrl || data.url || data.path || "";

      field.onChange(newImageUrl);

      if (record && record.id) {
        update("categories", {
          id: record.id,
          data: { [source]: newImageUrl },
          previousData: record,
        });
      }

      notify("Image uploaded successfully", { type: "success" });
    } catch (error) {
      console.error("Error uploading image:", error);
      notify(
        `Error uploading image: ${error instanceof Error ? error.message : String(error)}`,
        { type: "error" },
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="body2"
        component="label"
        htmlFor="image-upload"
        sx={{ mb: 1 }}
      >
        {label}
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ display: "block", mb: 1 }}
      >
        Click the button below to select and upload an image
      </Typography>

      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <input
          ref={fileInputRef}
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<ImageIcon />}
          disabled={uploading}
          sx={{ width: "fit-content" }}
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>

        {imageUrl && (
          <Box sx={{ mt: 2, maxWidth: "300px" }}>
            <img
              src={imageUrl}
              alt="Category Image"
              style={{ width: "100%", borderRadius: "4px" }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
