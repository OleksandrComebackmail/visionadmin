import { useState } from "react";
import { useDataProvider, useNotify, useRefresh } from "react-admin";
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
} from "@mui/material";

interface TestimonialsFormData {
  name: string;
  position: string;
  description: string;
  rate: number;
  videoUrl: string;
  order: number | string;
}

const initialData: TestimonialsFormData = {
  name: "",
  position: "",
  description: "",
  rate: 5,
  videoUrl: "",
  order: 1,
};

export const CreateTestimonials = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<TestimonialsFormData>(initialData);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

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
    if (newValue) {
      setFormData((prev) => ({ ...prev, rate: newValue }));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        order: Number(formData.order),
      };

      await dataProvider.create("testimonials", { data: payload });

      notify("Testimonial created successfully", { type: "success" });
      handleClose();
      refresh();
    } catch (error) {
      console.error(error);
      notify("Error creating testimonial", { type: "error" });
    }
  };

  const handleClose = () => {
    setFormData(initialData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Testimonial</DialogTitle>
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
            placeholder="e.g. Marketing Manager"
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

          <TextField
            label="Video URL"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            fullWidth
            placeholder="https://cdn.example.com/videos/..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !formData.name || !formData.position || !formData.description
          }
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
