import { useState, useEffect } from "react";
import {
  TopToolbar,
  useDataProvider,
  useNotify,
  TextInput,
  SaveButton,
  Toolbar,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { HtmlTextInput } from "@/components/HtmlTextInput";
import { ImageUploadField } from "@/resources/categories/ImageUploadField";

interface FormData {
  title: string;
  content: string;
  mediaUrl: string;
}

const ComingKidsEditActions = () => {
  const navigate = useNavigate();
  return (
    <TopToolbar>
      <Button onClick={() => navigate("/coming-soon")} variant="text">
        Back to Coming Soon
      </Button>
    </TopToolbar>
  );
};

export const ComingKidsEdit = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
      mediaUrl: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataProvider.getOne("coming-kids", {
          id: "coming-kids-page-id",
        });
        const data = response.data;

        form.reset({
          title: data?.title || "",
          content: data?.content || "",
          mediaUrl: data?.mediaUrl || "",
        });
      } catch (error) {
        notify("Error loading data", { type: "error" });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataProvider, notify, form]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = form.getValues();

      await dataProvider.update("coming-kids", {
        id: "coming-kids-page-id",
        data: {
          title: values.title,
          content: values.content,
          mediaUrl: values.mediaUrl,
        },
        previousData: {},
      });

      notify("Coming Kids saved successfully", { type: "success" });
      navigate("/coming-soon");
    } catch (error) {
      notify("Error saving changes", { type: "error" });
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ padding: "16px" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const cardStyles = {
    boxShadow: isDarkMode
      ? "0 2px 10px rgba(0, 0, 0, 0.3)"
      : "0 2px 10px rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
    backgroundColor: isDarkMode ? "#263B3E" : "white",
    mb: 3,
  };

  const inputStyles = {
    "& .MuiInputLabel-root": {
      color: isDarkMode ? "#8FD0C8" : "#214849",
    },
    "& .MuiInputBase-root": {
      backgroundColor: isDarkMode ? "#1F3033" : "#F0F9F8",
      color: isDarkMode ? "#ffffff" : "#0a0a0a",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "#315754" : "#9BB8B5",
    },
  };

  return (
    <FormProvider {...form}>
      <Box sx={{ padding: "16px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Edit Coming Kids
          </Typography>
          <ComingKidsEditActions />
        </Box>

        <Card sx={cardStyles}>
          <CardContent>
            <TextInput
              source="title"
              label="Title"
              fullWidth
              sx={inputStyles}
            />
            <HtmlTextInput
              source="content"
              label="Content"
              multiline
              rows={6}
              fullWidth
            />
            <ImageUploadField
              source="mediaUrl"
              label="Media Image"
              allowVideo
            />
          </CardContent>
        </Card>

        <Toolbar>
          <SaveButton onClick={handleSave} disabled={saving} />
        </Toolbar>
        {saving && <Typography>Saving...</Typography>}
      </Box>
    </FormProvider>
  );
};

