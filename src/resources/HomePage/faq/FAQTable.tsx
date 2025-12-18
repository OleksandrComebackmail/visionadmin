import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  TextField,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from "@mui/material/styles";
import FAQItemModal from "./FAQItemModal";
import { useNotify } from "react-admin";

interface FAQItem {
  id: string;
  order: number;
  question: string;
  answer: string;
}

export const FAQTable: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const notify = useNotify();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [items, setItems] = useState<FAQItem[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);

  const fetchFAQ = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const headers: HeadersInit = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const res = await fetch(
        "https://api.vision.softwaredoes.com/api/admin/faq",
        { headers },
      );
      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        notify(`Error fetching FAQ: ${text}`);
        setLoading(false);
        return;
      }
      const json = await res.json();
      setTitle(json.title || "");
      setSubtitle(json.subtitle || "");
      setItems(Array.isArray(json.items) ? json.items : []);
    } catch (err) {
      console.error(err);
      notify("Error fetching FAQ", { type: "error" });
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    void fetchFAQ();
  }, [fetchFAQ]);

  const saveFAQ = async (
    newItems: FAQItem[],
    newTitle?: string,
    newSubtitle?: string,
  ) => {
    try {
      setLoading(true);
      const payload = {
        title: newTitle ?? title,
        subtitle: newSubtitle ?? subtitle,
        items: newItems,
      };

      const token = localStorage.getItem("access_token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch(
        "https://api.vision.softwaredoes.com/api/admin/faq",
        {
          method: "PUT",
          headers,
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        notify(`Error saving FAQ: ${text}`, { type: "error" });
        setLoading(false);
        return;
      }
      await fetchFAQ();
      notify("FAQ saved", { type: "success" });
    } catch (err) {
      console.error(err);
      notify("Error saving FAQ", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMeta = async () => {
    await saveFAQ(items, title, subtitle);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item: FAQItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const newItems = items.filter((i) => i.id !== id);
    await saveFAQ(newItems);
  };

  const handleModalSave = async (item: FAQItem) => {
    const exists = items.some((i) => i.id === item.id);
    const newItems = exists
      ? items.map((i) => (i.id === item.id ? item : i))
      : [...items, item];
    await saveFAQ(newItems);
    setModalOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "16px" }}>
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
            FAQ
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={handleSaveMeta}
              disabled={loading}
              sx={{
                borderColor: isDarkMode ? "#315754" : undefined,
                color: isDarkMode ? "#fff" : undefined,
              }}
            >
              Save FAQ
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              sx={{
                backgroundColor: isDarkMode ? "#214849" : "#9BB8B5",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#315754" : "#8AA7A4",
                },
              }}
            >
              Create FAQ item
            </Button>
          </Stack>
        </Box>

        <Box p={2}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="standard"
            />
            <TextField
              label="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              fullWidth
              variant="standard"
            />
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {items.length === 0 ? (
            <Typography>No FAQ items yet.</Typography>
          ) : (
            items
              .slice()
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((item) => (
                <Paper
                  key={item.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: isDarkMode ? "#1F3033" : "#fff",
                    borderRadius: "8px",
                  }}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="subtitle2">
                        {item.question}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {item.answer}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))
          )}
        </Box>
      </Box>

      <FAQItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialItem={editingItem ?? undefined}
        onSave={handleModalSave}
      />
    </Box>
  );
};

export default FAQTable;
