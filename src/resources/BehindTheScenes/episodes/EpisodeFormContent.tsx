import {
  Box,
  Typography,
  Button,
  TextField as MuiTextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { StandaloneImageUpload } from "@/components/StandaloneImageUpload";

interface VideoLink {
  platform: string;
  url: string;
}

export const EpisodeFormContent = ({
  formData,
  setFormData,
  handleAddLink,
  handleRemoveLink,
  handleLinkChange,
}: any) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
      <MuiTextField
        label="Episode Name"
        fullWidth
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <MuiTextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <MuiTextField
        label="Current Cover Image URL"
        fullWidth
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />
      <StandaloneImageUpload
        value={formData.imageUrl}
        onChange={(url) => setFormData({ ...formData, imageUrl: url })}
        label="Upload Episode Cover Image"
      />

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle2">Video Links</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={handleAddLink}>
            Add Link
          </Button>
        </Box>

        {formData.links.map((link: VideoLink, index: number) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: 2,
              mb: 2,
              alignItems: "center",
            }}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Platform</InputLabel>
              <Select
                value={link.platform}
                label="Platform"
                onChange={(e) =>
                  handleLinkChange(index, "platform", e.target.value)
                }
              >
                <MenuItem value="youtube">YouTube</MenuItem>
              </Select>
            </FormControl>
            <MuiTextField
              label="URL"
              fullWidth
              required
              value={link.url}
              onChange={(e) => handleLinkChange(index, "url", e.target.value)}
            />
            {formData.links.length > 1 && (
              <IconButton onClick={() => handleRemoveLink(index)} color="error">
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
