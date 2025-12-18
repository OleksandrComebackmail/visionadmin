import { useState, useEffect } from "react";
import { useDataProvider, useNotify, useRefresh, RaRecord } from "react-admin";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  Rating,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { StandaloneImageUpload } from "@/components/StandaloneImageUpload";

interface TestimonialRecord extends RaRecord {
  name: string;
  position: string;
  description: string;
  rate: number;
  videoUrl?: string;
  imageUrl?: string;
  order: number;
}

interface TestimonialsFormData {
  name: string;
  position: string;
  description: string;
  rate: number;
  videoUrl?: string;
  imageUrl?: string;
  order: number | string;
}

export const EditTestimonials = ({
  open,
  onClose,
  record,
}: {
  open: boolean;
  onClose: () => void;
  record: TestimonialRecord | null;
}) => {
  const [formData, setFormData] = useState<TestimonialsFormData>({
    name: "",
    position: "",
    description: "",
    rate: 0,
    videoUrl: "",
    imageUrl: "",
    order: 0,
  });
  const [mediaType, setMediaType] = useState<"none" | "image" | "video">(
    "none",
  );
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  useEffect(() => {
    if (record) {
      setFormData({
        name: record.name || "",
        position: record.position || "",
        description: record.description || "",
        rate: record.rate || 0,
        videoUrl: record.videoUrl || "",
        imageUrl: record.imageUrl || "",
        order: record.order || 0,
      });

      if (record.imageUrl) setMediaType("image");
      else if (record.videoUrl) setMediaType("video");
      else setMediaType("none");
    }
  }, [record, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRateChange = (
    _event: React.SyntheticEvent,
    newValue: number | null,
  ) => {
    if (newValue !== null) {
      setFormData((prev) => ({ ...prev, rate: newValue }));
    }
  };

  const handleSubmit = async () => {
    if (!record || !record.id) return;

    try {
      const payload: Omit<TestimonialRecord, "id"> = {
        name: formData.name,
        position: formData.position,
        description: formData.description,
        rate: formData.rate,
        videoUrl: mediaType === "video" ? formData.videoUrl || "" : "",
        imageUrl: mediaType === "image" ? formData.imageUrl || "" : "",
        order: Number(formData.order),
      };

      await dataProvider.update("testimonials", {
        id: record.id,
        data: payload,
        previousData: record,
      });

      notify("Testimonial updated successfully", { type: "success" });
      onClose();
      refresh();
    } catch {
      notify("Error updating testimonial", { type: "error" });
    }
  };

  const isFormValid =
    formData.name.trim() !== "" && formData.description.trim() !== "";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Testimonial: {record?.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            autoFocus
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            fullWidth
            required
          />

          <Box>
            <Typography
              component="legend"
              variant="caption"
              color="textSecondary"
            >
              Rate
            </Typography>
            <Rating
              name="rate"
              value={formData.rate}
              onChange={handleRateChange}
            />
          </Box>

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
          />

          <TextField
            label="Order"
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
            fullWidth
            required
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Media
            </Typography>
            <RadioGroup
              row
              value={mediaType}
              onChange={(
                _: React.ChangeEvent<HTMLInputElement>,
                value: string,
              ) => setMediaType(value as "none" | "image" | "video")}
            >
              <FormControlLabel value="none" control={<Radio />} label="None" />
              <FormControlLabel value="image" control={<Radio />} label="Image" />
              <FormControlLabel value="video" control={<Radio />} label="Video" />
            </RadioGroup>

            {mediaType === "image" && (
              <StandaloneImageUpload
                label="Upload image"
                value={formData.imageUrl || ""}
                onChange={(url) =>
                  setFormData((p) => ({ ...p, imageUrl: url }))
                }
              />
            )}

            {mediaType === "video" && (
              <TextField
                label="Video URL"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                fullWidth
                placeholder="https://cdn.example.com/videos/..."
              />
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
