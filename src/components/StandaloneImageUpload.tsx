import ImageIcon from "@mui/icons-material/Image";
import { Box, Typography, Button as MuiButton } from "@mui/material";
import { useRef, useState } from "react";

interface StandaloneImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  allowVideo?: boolean;
}

const API_URL = "https://api.vision.softwaredoes.com/api/admin";

export const StandaloneImageUpload = ({
  value,
  onChange,
  label,
  allowVideo = false,
}: StandaloneImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);
    setError(null);

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
      const newUrl = data.url ?? "";

      onChange(newUrl);
    } catch (error) {
      console.error("Upload error:", error);
      setError(
        `Upload failed: ${error instanceof Error ? error.message : String(error)}`,
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
        htmlFor="standalone-image-upload"
        sx={{ mb: 1, fontWeight: 500 }}
      >
        {label}
      </Typography>

      <Typography
        variant="caption"
        sx={{ display: "block", mb: 1, color: "text.secondary" }}
      >
        {allowVideo
          ? "You can upload image or video"
          : "Click below to upload an image"}
      </Typography>

      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <input
          ref={fileInputRef}
          id="standalone-image-upload"
          type="file"
          accept={allowVideo ? "image/*,video/*" : "image/*"}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

        <MuiButton
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
        </MuiButton>

        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}

        {value && (
          <Box sx={{ mt: 2, maxWidth: "300px" }}>
            {isVideo(value) ? (
              <video
                src={value}
                controls
                style={{ width: "100%", borderRadius: "4px" }}
              />
            ) : (
              <img
                src={value}
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
