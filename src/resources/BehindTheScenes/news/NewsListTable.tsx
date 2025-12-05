import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  ImageField,
  EditButton,
  ShowButton,
  Pagination,
} from "react-admin";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export const NewsListTable = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  return (
    <Box
      sx={{
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backgroundColor: isDarkMode ? "#1F3033" : "#F0F9F8",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          News & Stories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/news/create")}
          sx={{
            backgroundColor: isDarkMode ? "#214849" : "#9BB8B5",
            "&:hover": {
              backgroundColor: isDarkMode ? "#315754" : "#8AA7A4",
            },
          }}
        >
          Create News
        </Button>
      </Box>

      <List
        resource="news"
        actions={false}
        disableSyncWithLocation // ВАЖЛИВО: Щоб не конфліктувало з пагінацією епізодів
        perPage={10}
        pagination={<Pagination rowsPerPageOptions={[5, 10, 25]} />}
        sx={{
          "& .RaList-main": { boxShadow: "none" },
          "& .RaList-content": { boxShadow: "none" },
        }}
      >
        <Datagrid
          bulkActionButtons={false}
          rowClick="show"
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
          <TextField source="title" label="Title" />
          <ImageField
            source="preview"
            label="Preview"
            sx={{
              "& img": {
                maxWidth: "80px",
                height: "auto",
                borderRadius: "4px",
              },
            }}
          />
          <TextField source="description" label="Short Description" />

          <ShowButton />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    </Box>
  );
};
