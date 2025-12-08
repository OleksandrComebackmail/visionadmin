import { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  FunctionField,
  RaRecord,
  Pagination,
} from "react-admin";
import { Box, Typography, Button, IconButton, Rating } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ShowTestimonials } from "@/resources/HomePage/testimonials/ShowTestimonials.tsx";
import { EditTestimonials } from "@/resources/HomePage/testimonials/EditTestimonials.tsx";
import { CreateTestimonials } from "@/resources/HomePage/testimonials/CreateTestimonials.tsx";

interface TestimonialRecord extends RaRecord {
  name: string;
  position: string;
  description: string;
  rate: number;
  videoUrl: string;
  order: number;
}

export const TestimonialsListTable = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<TestimonialRecord | null>(null);

  const handleEditClick = (record: TestimonialRecord) => {
    setSelectedRecord(record);
    setEditOpen(true);
  };

  const handleShowClick = (record: TestimonialRecord) => {
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
            Testimonials
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
            Create Testimonial
          </Button>
        </Box>

        <List
          resource="testimonials"
          actions={false}
          perPage={10}
          pagination={<Pagination rowsPerPageOptions={[5, 10, 25]} />}
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
            <TextField source="order" label="#" sx={{ fontWeight: "bold" }} />

            <TextField source="name" label="Name" />

            <TextField source="position" label="Position" />

            <FunctionField
              label="Rate"
              render={(record: TestimonialRecord) => (
                <Rating value={record.rate} readOnly size="small" />
              )}
            />

            <FunctionField
              render={(record: TestimonialRecord) => (
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
              render={(record: TestimonialRecord) => (
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

      <CreateTestimonials open={createOpen} onClose={closeModals} />

      <EditTestimonials
        open={editOpen}
        onClose={closeModals}
        record={selectedRecord}
      />

      <ShowTestimonials
        open={showOpen}
        onClose={closeModals}
        record={selectedRecord}
      />
    </Box>
  );
};
