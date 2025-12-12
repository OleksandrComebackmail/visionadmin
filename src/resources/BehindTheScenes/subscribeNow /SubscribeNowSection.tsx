import { useState } from "react";
import {
  useGetOne,
  useUpdate,
  SimpleForm,
  TextInput,
  Loading,
  SaveButton,
  Toolbar,
  useNotify,
} from "react-admin";
import { Typography, Box, Button, Divider, Link } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTheme } from "@mui/material/styles";

const CustomToolbar = ({ onCancel, ...props }: { onCancel: () => void }) => (
  <Toolbar
    {...props}
    sx={{ display: "flex", justifyContent: "space-between", px: 0 }}
  >
    <SaveButton />
    <Button onClick={onCancel} startIcon={<CloseIcon />}>
      Cancel
    </Button>
  </Toolbar>
);

export const SubscribeNowSection = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [isEditing, setIsEditing] = useState(false);
  const notify = useNotify();

  const { data, isLoading, error, refetch } = useGetOne("subscription", {
    id: "subscription-page-id",
  });

  const [update] = useUpdate();

  if (isLoading) return <Loading />;
  if (error) {
    return (
      <Box sx={{ mb: 3, p: 2 }}>
        <Typography color="error">Error loading data</Typography>
      </Box>
    );
  }
  if (!data) return null;

  const handleSave = async (values: Record<string, unknown>) => {
    try {
      await update("subscription", {
        id: "subscription-page-id",
        data: values,
        previousData: data,
      });
      notify("Subscription info updated successfully", { type: "success" });
      setIsEditing(false);
      refetch();
    } catch (err) {
      notify("Error updating subscription info", { type: "error" });
      console.error("Update error:", err);
    }
  };

  return (
    <Box
      sx={{
        mb: 4,
        flexShrink: 0,
        margin: 2,
        boxShadow: isDarkMode
          ? "0 2px 10px rgba(0, 0, 0, 0.3)"
          : "0 2px 10px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: isDarkMode ? "#263538" : "#E8F5F2",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        sx={{
          backgroundColor: isDarkMode ? "#1F3033" : "#F0F9F8",
          borderBottom: isDarkMode ? "1px solid #1A2F2E" : "1px solid #D7EBE9",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Subscribe Now
        </Typography>

        {!isEditing && (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            size="small"
            sx={{
              backgroundColor: isDarkMode ? "#214849" : "#9BB8B5",
              "&:hover": {
                backgroundColor: isDarkMode ? "#315754" : "#8AA7A4",
              },
            }}
          >
            Edit Info
          </Button>
        )}
      </Box>

      <Box
        sx={{
          p: 2,
          backgroundColor: isDarkMode ? "#263B3E" : "white",
          color: isDarkMode ? "#ffffff" : "#0a0a0a",
        }}
      >
        {isEditing ? (
          <SimpleForm
            onSubmit={handleSave}
            record={data}
            toolbar={<CustomToolbar onCancel={() => setIsEditing(false)} />}
            sx={{ p: 0 }}
          >
            <TextInput
              source="youtubeUrl"
              fullWidth
              label="YouTube URL"
              sx={{ mt: 2 }}
            />
            <TextInput
              source="instagramUrl"
              fullWidth
              label="Instagram URL"
              sx={{ mt: 2 }}
            />
          </SimpleForm>
        ) : (
          <Box>
            <Box mb={2}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                YouTube URL
              </Typography>
              {data.youtubeUrl ? (
                <Link
                  href={data.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <YouTubeIcon sx={{ color: "#FF0000" }} />
                  {data.youtubeUrl}
                </Link>
              ) : (
                <Typography variant="body1">(No YouTube URL)</Typography>
              )}
            </Box>

            <Divider sx={{ my: 2, opacity: 0.6 }} />

            <Box>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Instagram URL
              </Typography>
              {data.instagramUrl ? (
                <Link
                  href={data.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <InstagramIcon sx={{ color: "#E4405F" }} />
                  {data.instagramUrl}
                </Link>
              ) : (
                <Typography variant="body1">(No Instagram URL)</Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
