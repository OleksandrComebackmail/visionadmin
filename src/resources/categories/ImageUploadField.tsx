import ImageIcon from "@mui/icons-material/Image";
import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Button, useInput, useNotify } from "react-admin";

interface ImageUploadFieldProps {
  source: string;
  label: string;
  allowVideo?: boolean; // ← NEW
}

const API_URL = "https://api.vision.softwaredoes.com/api/admin";

export const ImageUploadField = (props: ImageUploadFieldProps) => {
  const { source, label, allowVideo = false } = props; // ← NEW
  const notify = useNotify();
  const [uploading, setUploading] = useState(false);

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

      const response = await fetch(`${API_URL}/pages/media`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // API returns {url, key, type}
      const newUrl = data.url ?? "";

      field.onChange(newUrl);

      notify("File uploaded successfully", { type: "success" });
    } catch (error) {
      console.error("Upload error:", error);
      notify(
        `Upload failed: ${error instanceof Error ? error.message : String(error)}`,
        { type: "error" },
      );
    } finally {
      setUploading(false);
    }
  };

  const isVideo = (url?: string) => url?.match(/\.(mp4|mov|webm|avi|mkv)$/i);

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

      <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
        {allowVideo
          ? "You can upload image or video"
          : "Click below to upload an image"}
      </Typography>

      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <input
          ref={fileInputRef}
          id="image-upload"
          type="file"
          accept={allowVideo ? "image/*,video/*" : "image/*"} // ← NEW
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<ImageIcon />}
          disabled={uploading}
          sx={{ width: "fit-content" }}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading
            ? "Uploading..."
            : allowVideo
              ? "Upload Image/Video"
              : "Upload Image"}
        </Button>

        {imageUrl && (
          <Box sx={{ mt: 2, maxWidth: "300px" }}>
            {isVideo(imageUrl) ? (
              <video
                src={imageUrl}
                controls
                style={{ width: "100%", borderRadius: "4px" }}
              />
            ) : (
              <img
                src={imageUrl}
                alt="Uploaded file"
                style={{ width: "100%", borderRadius: "4px" }}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
