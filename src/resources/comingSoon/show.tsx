// filepath: /Users/user/work/visionadmin/src/resources/comingSoon/show.tsx
import { useState, useEffect } from "react";
import { useDataProvider, useNotify } from "react-admin";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";

interface ComingData {
  title?: string;
  content?: string;
  mediaUrl?: string;
}

export const ComingSoonShow = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const navigate = useNavigate();

  const [kidsData, setKidsData] = useState<ComingData | null>(null);
  const [businessData, setBusinessData] = useState<ComingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kidsResponse, businessResponse] = await Promise.all([
          dataProvider.getOne("coming-kids", { id: "coming-kids-page-id" }),
          dataProvider.getOne("coming-business", {
            id: "coming-business-page-id",
          }),
        ]);
        setKidsData(kidsResponse.data);
        setBusinessData(businessResponse.data);
      } catch (error) {
        notify("Error loading data", { type: "error" });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataProvider, notify]);

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

  const labelStyles = {
    color: isDarkMode ? "#8FD0C8" : "#214849",
    fontWeight: "500",
    fontSize: "14px",
    mb: 1,
  };

  const valueStyles = {
    color: isDarkMode ? "#ffffff" : "#0a0a0a",
  };

  return (
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
          Coming Soon
        </Typography>
      </Box>

      {/* Coming Kids Section */}
      <Card sx={cardStyles}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? "#8FD0C8" : "#214849",
              }}
            >
              Coming Kids
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => navigate("/coming-kids/edit")}
            >
              Edit
            </Button>
          </Box>
          <Divider
            sx={{ mb: 2, borderColor: isDarkMode ? "#315754" : "#9BB8B5" }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>Title:</Typography>
            <Typography sx={valueStyles}>{kidsData?.title || "—"}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>Content:</Typography>
            {kidsData?.content ? (
              <Box
                sx={valueStyles}
                dangerouslySetInnerHTML={{ __html: kidsData.content }}
              />
            ) : (
              <Typography sx={valueStyles}>—</Typography>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>Media:</Typography>
            {kidsData?.mediaUrl ? (
              <Box
                component="img"
                src={kidsData.mediaUrl}
                alt="Coming Kids Media"
                sx={{
                  maxWidth: "300px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <Typography sx={valueStyles}>—</Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Coming Business Section */}
      <Card sx={cardStyles}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? "#8FD0C8" : "#214849",
              }}
            >
              Coming Business
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => navigate("/coming-business/edit")}
            >
              Edit
            </Button>
          </Box>
          <Divider
            sx={{ mb: 2, borderColor: isDarkMode ? "#315754" : "#9BB8B5" }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>Title:</Typography>
            <Typography sx={valueStyles}>
              {businessData?.title || "—"}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>Content:</Typography>
            {businessData?.content ? (
              <Box
                sx={valueStyles}
                dangerouslySetInnerHTML={{ __html: businessData.content }}
              />
            ) : (
              <Typography sx={valueStyles}>—</Typography>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={labelStyles}>Media:</Typography>
            {businessData?.mediaUrl ? (
              <Box
                component="img"
                src={businessData.mediaUrl}
                alt="Coming Business Media"
                sx={{
                  maxWidth: "300px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <Typography sx={valueStyles}>—</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
