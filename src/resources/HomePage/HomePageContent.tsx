import { useGetOne, useUpdate, useNotify } from "react-admin";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

interface Step {
  title: string;
  description: string;
}

interface HeroData {
  title: string;
  subtitle: string;
}

interface MapData {
  title: string;
  description: string;
  steps: Step[];
}

interface ShiftData {
  title: string;
  description: string;
}

interface HomePageData {
  id: string;
  hero?: HeroData;
  map?: MapData;
  shift?: ShiftData;
}

export const HomePageContent = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const notify = useNotify();
  const [update, { isPending: isUpdating }] = useUpdate();

  const { data, isLoading, refetch } = useGetOne<HomePageData>(
    "home-page",
    { id: "home-page-id" },
    { staleTime: 0 },
  );

  const [hero, setHero] = useState<HeroData>({ title: "", subtitle: "" });
  const [mapData, setMapData] = useState<MapData>({
    title: "",
    description: "",
    steps: [],
  });
  const [shift, setShift] = useState<ShiftData>({ title: "", description: "" });

  useEffect(() => {
    if (data) {
      setHero(data.hero ?? { title: "", subtitle: "" });
      setMapData(data.map ?? { title: "", description: "", steps: [] });
      setShift(data.shift ?? { title: "", description: "" });
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await update(
        "home-page",
        {
          id: "home-page-id",
          data: { hero, map: mapData, shift },
        },
        { mutationMode: "pessimistic" },
      );
      await refetch();
      notify("Home page content updated successfully", { type: "success" });
    } catch {
      notify("Error updating home page content", { type: "error" });
    }
  };

  const handleStepChange = (
    index: number,
    field: "title" | "description",
    value: string,
  ) => {
    setMapData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step,
      ),
    }));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card
      sx={{
        mb: 4,
        backgroundColor: isDarkMode ? "#263538" : "#ffffff",
        borderRadius: "8px",
        boxShadow: isDarkMode
          ? "0 2px 10px rgba(0, 0, 0, 0.3)"
          : "0 2px 10px rgba(0, 0, 0, 0.08)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: isDarkMode ? "#8FD0C8" : "#214849", mb: 3 }}
        >
          Home Page Content
        </Typography>

        <Box mb={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: isDarkMode ? "#ffffff" : "#0a0a0a" }}
          >
            Hero Section
          </Typography>
          <TextField
            label="Title"
            value={hero.title}
            onChange={(e) =>
              setHero((prev) => ({ ...prev, title: e.target.value }))
            }
            fullWidth
            margin="normal"
            sx={{
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
            }}
          />
          <TextField
            label="Subtitle"
            value={hero.subtitle}
            onChange={(e) =>
              setHero((prev) => ({ ...prev, subtitle: e.target.value }))
            }
            fullWidth
            margin="normal"
            multiline
            rows={2}
            sx={{
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
            }}
          />
        </Box>

        <Box mb={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: isDarkMode ? "#ffffff" : "#0a0a0a" }}
          >
            Momentum Map Section
          </Typography>
          <TextField
            label="Title"
            value={mapData.title}
            onChange={(e) =>
              setMapData((prev) => ({ ...prev, title: e.target.value }))
            }
            fullWidth
            margin="normal"
            sx={{
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
            }}
          />
          <TextField
            label="Description"
            value={mapData.description}
            onChange={(e) =>
              setMapData((prev) => ({ ...prev, description: e.target.value }))
            }
            fullWidth
            margin="normal"
            multiline
            rows={3}
            sx={{
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
            }}
          />

          <Box mt={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: isDarkMode ? "#ffffff" : "#0a0a0a" }}
            >
              Steps
            </Typography>
            {mapData.steps.map((step, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: isDarkMode ? "#1F3033" : "#F0F9F8",
                  borderRadius: "8px",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: isDarkMode ? "#8FD0C8" : "#214849" }}
                  >
                    Step {index + 1}
                  </Typography>
                </Box>
                <TextField
                  label="Step Title"
                  value={step.title}
                  onChange={(e) =>
                    handleStepChange(index, "title", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  size="small"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? "#8FD0C8" : "#214849",
                    },
                    "& .MuiInputBase-root": {
                      backgroundColor: isDarkMode ? "#263538" : "#ffffff",
                      color: isDarkMode ? "#ffffff" : "#0a0a0a",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "#315754" : "#9BB8B5",
                    },
                  }}
                />
                <TextField
                  label="Step Description"
                  value={step.description}
                  onChange={(e) =>
                    handleStepChange(index, "description", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  size="small"
                  multiline
                  rows={2}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? "#8FD0C8" : "#214849",
                    },
                    "& .MuiInputBase-root": {
                      backgroundColor: isDarkMode ? "#263538" : "#ffffff",
                      color: isDarkMode ? "#ffffff" : "#0a0a0a",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "#315754" : "#9BB8B5",
                    },
                  }}
                />
              </Paper>
            ))}
          </Box>
        </Box>

        <Box mb={3}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: isDarkMode ? "#ffffff" : "#0a0a0a" }}
          >
            Shift Section
          </Typography>
          <TextField
            label="Title"
            value={shift.title}
            onChange={(e) =>
              setShift((prev) => ({ ...prev, title: e.target.value }))
            }
            fullWidth
            margin="normal"
            sx={{
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
            }}
          />
          <TextField
            label="Description"
            value={shift.description}
            onChange={(e) =>
              setShift((prev) => ({ ...prev, description: e.target.value }))
            }
            fullWidth
            margin="normal"
            multiline
            rows={3}
            sx={{
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
            }}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isUpdating}
            sx={{
              backgroundColor: isDarkMode ? "#8FD0C8" : "#214849",
              color: isDarkMode ? "#0a0a0a" : "#ffffff",
              "&:hover": {
                backgroundColor: isDarkMode ? "#aee4dd" : "#2a5a5b",
              },
              "&:disabled": {
                backgroundColor: isDarkMode ? "#4a6b68" : "#9BB8B5",
              },
            }}
          >
            {isUpdating ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
