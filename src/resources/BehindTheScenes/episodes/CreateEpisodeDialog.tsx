import { useState } from "react";
import { useDataProvider, useNotify, useRefresh } from "react-admin";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { EpisodeFormContent } from "@/resources/BehindTheScenes/episodes/EpisodeFormContent.tsx";

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

export const CreateEpisodeDialog = ({
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
        <EpisodeFormContent
          formData={formData}
          setFormData={setFormData}
          handleAddLink={handleAddLink}
          handleRemoveLink={handleRemoveLink}
          handleLinkChange={handleLinkChange}
        />
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
