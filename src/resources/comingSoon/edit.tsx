// filepath: /Users/user/work/visionadmin/src/resources/comingSoon/edit.tsx
import { useState, useEffect } from "react";
import {
  TopToolbar,
  ShowButton,
  useDataProvider,
  useNotify,
  TextInput,
  SaveButton,
  Toolbar,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import { useNavigate } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { HtmlTextInput } from "@/components/HtmlTextInput";
import { ImageUploadField } from "@/resources/categories/ImageUploadField";

interface ComingData {
  title?: string;
  content?: string;
  mediaUrl?: string;
}

interface FormData {
  kidsTitle: string;
  kidsContent: string;
  kidsMediaUrl: string;
  businessTitle: string;
  businessContent: string;
  businessMediaUrl: string;
}

const ComingSoonEditActions = () => (
  <TopToolbar>
    <ShowButton />
  </TopToolbar>
);

const ComingSoonEditToolbar = ({ onSave }: { onSave: () => void }) => (
  <Toolbar>
    <SaveButton onClick={onSave} />
  </Toolbar>
);

export const ComingSoonEdit = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      kidsTitle: "",
      kidsContent: "",
      kidsMediaUrl: "",
      businessTitle: "",
      businessContent: "",
      businessMediaUrl: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kidsResponse, businessResponse] = await Promise.all([
          dataProvider.getOne("coming-kids", { id: "coming-kids-page-id" }),
          dataProvider.getOne("coming-business", {
            id: "coming-business-page-id",
          }),
        ]);
        const kidsData = kidsResponse.data as ComingData;
        const businessData = businessResponse.data as ComingData;

        form.reset({
          kidsTitle: kidsData?.title || "",
          kidsContent: kidsData?.content || "",
          kidsMediaUrl: kidsData?.mediaUrl || "",
          businessTitle: businessData?.title || "",
          businessContent: businessData?.content || "",
          businessMediaUrl: businessData?.mediaUrl || "",
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

      await Promise.all([
        dataProvider.update("coming-kids", {
          id: "coming-kids-page-id",
          data: {
            title: values.kidsTitle,
            content: values.kidsContent,
            mediaUrl: values.kidsMediaUrl,
          },
          previousData: {},
        }),
        dataProvider.update("coming-business", {
          id: "coming-business-page-id",
          data: {
            title: values.businessTitle,
            content: values.businessContent,
            mediaUrl: values.businessMediaUrl,
          },
          previousData: {},
        }),
      ]);

      notify("Changes saved successfully", { type: "success" });
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
            Edit Coming Soon
          </Typography>
          <ComingSoonEditActions />
        </Box>

        {/* Coming Kids Section */}
        <Card sx={cardStyles}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: isDarkMode ? "#8FD0C8" : "#214849",
              }}
            >
              Coming Kids
            </Typography>
            <Divider
              sx={{ mb: 2, borderColor: isDarkMode ? "#315754" : "#9BB8B5" }}
            />

            <TextInput
              source="kidsTitle"
              label="Title"
              fullWidth
              sx={inputStyles}
            />
            <HtmlTextInput
              source="kidsContent"
              label="Content"
              multiline
              rows={6}
              fullWidth
            />
            <ImageUploadField
              source="kidsMediaUrl"
              label="Media Image"
              allowVideo
            />
          </CardContent>
        </Card>

        {/* Coming Business Section */}
        <Card sx={cardStyles}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: isDarkMode ? "#8FD0C8" : "#214849",
              }}
            >
              Coming Business
            </Typography>
            <Divider
              sx={{ mb: 2, borderColor: isDarkMode ? "#315754" : "#9BB8B5" }}
            />

            <TextInput
              source="businessTitle"
              label="Title"
              fullWidth
              sx={inputStyles}
            />
            <HtmlTextInput
              source="businessContent"
              label="Content"
              multiline
              rows={6}
              fullWidth
            />
            <ImageUploadField
              source="businessMediaUrl"
              label="Media Image"
              allowVideo
            />
          </CardContent>
        </Card>

        <ComingSoonEditToolbar onSave={handleSave} />
        {saving && <Typography>Saving...</Typography>}
      </Box>
    </FormProvider>
  );
};
