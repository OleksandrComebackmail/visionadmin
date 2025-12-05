import { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  ImageField,
  FunctionField,
  RaRecord,
} from "react-admin";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CreateEpisodeDialog } from "@/resources/BehindTheScenes/episodes/CreateEpisodeDialog.tsx";
import { EditEpisodeDialog } from "@/resources/BehindTheScenes/episodes/EditEpisodeDialog.tsx";
import { ShowEpisodeDialog } from "@/resources/BehindTheScenes/episodes/ShowEpisodeDialog.tsx";

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

export const EpisodeDialogTable = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Episode | null>(null);

  const handleEditClick = (record: Episode) => {
    setSelectedRecord(record);
    setEditOpen(true);
  };

  const handleShowClick = (record: Episode) => {
    setSelectedRecord(record);
    setShowOpen(true);
  };

  const closeModals = () => {
    setCreateOpen(false);
    setEditOpen(false);
    setShowOpen(false);
    setTimeout(() => setSelectedRecord(null), 300);
  };

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
            Episodes
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateOpen(true)}
            sx={{
              backgroundColor: isDarkMode ? "#214849" : "#9BB8B5",
              "&:hover": {
                backgroundColor: isDarkMode ? "#315754" : "#8AA7A4",
              },
            }}
          >
            Create Episode
          </Button>
        </Box>

        <List
          resource="episodes"
          actions={false}
          sx={{
            "& .RaList-main": { boxShadow: "none" },
            "& .RaList-content": { boxShadow: "none" },
          }}
        >
          <Datagrid
            bulkActionButtons={false}
            rowClick={false}
            sx={{
              "& .RaDatagrid-headerCell": {
                backgroundColor: isDarkMode ? "#214849" : "#9BB8B5",
                color: "white",
                fontWeight: "500",
                fontSize: "0.95rem",
                padding: "16px 12px",
                borderBottom: "none",
              },
              "& .MuiTableBody-root.datagrid-body.RaDatagrid-tbody": {
                backgroundColor: isDarkMode ? "#263B3E" : "white",
              },
              "& .RaDatagrid-tbody tr:nth-of-type(odd)": {
                backgroundColor: isDarkMode ? "#1F3033" : "#F0F9F8",
              },
              "& .MuiTableCell-root": {
                borderBottom: isDarkMode
                  ? "1px solid #1A2F2E"
                  : "1px solid #D7EBE9",
                color: isDarkMode ? "#ffffff" : "#0a0a0a",
                padding: "12px",
              },
              "& .RaDatagrid-tbody tr:hover": {
                backgroundColor: isDarkMode ? "#315754" : "#D7EBE9",
                transition: "background-color 0.2s ease",
              },
            }}
          >
            <TextField source="name" label="Episode Name" />
            <ImageField
              source="imageUrl"
              label="Image"
              sx={{
                "& img": {
                  maxWidth: "80px",
                  height: "auto",
                  objectPosition: "left",
                  borderRadius: "4px",
                },
              }}
            />
            <TextField source="description" />

            <FunctionField
              render={(record: Episode) => (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowClick(record);
                  }}
                  color="primary"
                  size="small"
                >
                  <VisibilityIcon />
                </IconButton>
              )}
            />

            <FunctionField
              render={(record: Episode) => (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(record);
                  }}
                  color="primary"
                  size="small"
                >
                  <EditIcon />
                </IconButton>
              )}
            />

            <DeleteButton />
          </Datagrid>
        </List>
      </Box>

      <CreateEpisodeDialog open={createOpen} onClose={closeModals} />

      <EditEpisodeDialog
        open={editOpen}
        onClose={closeModals}
        record={selectedRecord}
      />

      <ShowEpisodeDialog
        open={showOpen}
        onClose={closeModals}
        record={selectedRecord}
      />
    </Box>
  );
};
