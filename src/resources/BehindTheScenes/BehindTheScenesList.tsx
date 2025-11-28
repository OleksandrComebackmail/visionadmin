import { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  useDataProvider,
  useNotify,
  useRefresh,
} from "react-admin";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface VideoLink {
  platform: string;
  url: string;
}

interface EpisodeFormData {
  name: string;
  description: string;
  imageUrl: string;
  links: VideoLink[];
}

const CreateEpisodeDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<EpisodeFormData>({
    name: "",
    description: "",
    imageUrl: "",
    links: [{ platform: "youtube", url: "" }],
  });
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleAddLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { platform: "youtube", url: "" }],
    });
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };

  const handleLinkChange = (
    index: number,
    field: keyof VideoLink,
    value: string,
  ) => {
    const newLinks = [...formData.links];
    newLinks[index][field] = value;
    setFormData({ ...formData, links: newLinks });
  };

  const handleSubmit = async () => {
    try {
      await dataProvider.create("episodes", { data: formData });
      notify("Episode created successfully", { type: "success" });
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        links: [{ platform: "youtube", url: "" }],
      });
      onClose();
      refresh();
    } catch (error) {
      notify("Error creating episode", { type: "error" });
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      links: [{ platform: "youtube", url: "" }],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Episode</DialogTitle>
      <DialogContent>
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
            label="Cover Image URL"
            fullWidth
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
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
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddLink}
              >
                Add Link
              </Button>
            </Box>

            {formData.links.map((link, index) => (
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
                    <MenuItem value="vimeo">Vimeo</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                <MuiTextField
                  label="URL"
                  fullWidth
                  required
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(index, "url", e.target.value)
                  }
                />
                {formData.links.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveLink(index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.name || formData.links.some((l) => !l.url)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const BehindTheScenesList = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        padding: "16px",
      }}
    >
      {/* Episodes Section */}
      <Box
        sx={{
          mb: 4,
          boxShadow: isDarkMode
            ? "0 2px 10px rgba(0, 0, 0, 0.3)"
            : "0 2px 10px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: isDarkMode ? "#263538" : "#E8F5F2",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            backgroundColor: isDarkMode ? "#1F3033" : "#F0F9F8",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Episodes
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: isDarkMode ? "#214849" : "#9BB8B5",
              "&:hover": {
                backgroundColor: isDarkMode ? "#315754" : "#8AA7A4",
              },
            }}
          >
            Create Episode
          </Button>
        </Box>

        <List
          resource="episodes"
          actions={false}
          sx={{
            "& .RaList-main": {
              boxShadow: "none",
            },
            "& .RaList-content": {
              boxShadow: "none",
            },
          }}
        >
          <Datagrid
            bulkActionButtons={false}
            sx={{
              "& .RaDatagrid-headerCell": {
                backgroundColor: isDarkMode ? "#214849" : "#9BB8B5",
                color: "white",
                fontWeight: "500",
                fontSize: "0.95rem",
                padding: "16px 12px",
                borderBottom: "none",
              },
              "& .MuiTableBody-root.datagrid-body.RaDatagrid-tbody": {
                backgroundColor: isDarkMode ? "#263B3E" : "white",
              },
              "& .RaDatagrid-tbody tr:nth-of-type(odd)": {
                backgroundColor: isDarkMode ? "#1F3033" : "#F0F9F8",
              },
              "& .MuiTableCell-root": {
                borderBottom: isDarkMode
                  ? "1px solid #1A2F2E"
                  : "1px solid #D7EBE9",
                color: isDarkMode ? "#ffffff" : "#0a0a0a",
                padding: "12px",
              },
              "& .RaDatagrid-tbody tr:hover": {
                backgroundColor: isDarkMode ? "#315754" : "#D7EBE9",
                transition: "background-color 0.2s ease",
              },
            }}
          >
            <TextField source="id" />
            <TextField source="name" label="Episode Name" />
            <TextField source="description" />
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTime />
            <EditButton />
            <DeleteButton />
          </Datagrid>
        </List>
      </Box>

      <CreateEpisodeDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};
