import { useState, useEffect } from "react";
import { useDataProvider, useNotify, useRefresh, RaRecord } from "react-admin";
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

interface Episode extends RaRecord {
  name: string;
  description: string;
  imageUrl: string;
  links: VideoLink[];
}

interface EpisodeFormData {
  name: string;
  description: string;
  imageUrl: string;
  links: VideoLink[];
}

export const EditEpisodeDialog = ({
  open,
  onClose,
  record,
}: {
  open: boolean;
  onClose: () => void;
  record: Episode | null;
}) => {
  const [formData, setFormData] = useState<EpisodeFormData>({
    name: "",
    description: "",
    imageUrl: "",
    links: [],
  });
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  useEffect(() => {
    if (record) {
      setFormData({
        name: record.name || "",
        description: record.description || "",
        imageUrl: record.imageUrl || "",
        links:
          record.links && record.links.length > 0
            ? record.links
            : [{ platform: "youtube", url: "" }],
      });
    }
  }, [record, open]);

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
    if (!record) return;
    try {
      await dataProvider.update("episodes", {
        id: record.id,
        data: formData,
        previousData: record,
      });
      notify("Episode updated successfully", { type: "success" });
      onClose();
      refresh();
    } catch (error) {
      notify("Error updating episode", { type: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Episode</DialogTitle>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.name || formData.links.some((l) => !l.url)}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
