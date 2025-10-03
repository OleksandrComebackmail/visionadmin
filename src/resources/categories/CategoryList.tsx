import {
  List,
  Datagrid,
  TextField as RA_TextField,
  BooleanField,
  DateField,
  DeleteButton,
  ShowButton,
  EditButton,
  ImageField,
} from "react-admin";
import { useTheme } from "@mui/material/styles";

export const CategoryList = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <List
      sx={{
        padding: "16px",
        backgroundColor: isDarkMode ? "#1A2F2E" : "#E8F5F2",
        borderRadius: "8px",
        "& .RaList-main": {
          boxShadow: isDarkMode
            ? "0 2px 10px rgba(0, 0, 0, 0.3)"
            : "0 2px 10px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          overflow: "hidden",
        },
      }}
    >
      <Datagrid
        rowClick="edit"
        sx={{
          "& .column-isDraft": {
            minWidth: "120px",
            width: "120px",
          },
          "& .RaDatagrid-headerCell": {
            backgroundColor: isDarkMode ? "#0D6159" : "#3D9B8F",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.95rem",
            padding: "16px 12px",
            borderBottom: "none",
          },
          "& .MuiTableBody-root.datagrid-body.RaDatagrid-tbody": {
            backgroundColor: isDarkMode ? "#263E3C" : "white",
          },
          "& .RaDatagrid-tbody tr:nth-of-type(odd)": {
            backgroundColor: isDarkMode ? "#1F3331" : "#F0F9F8",
          },
          "& .MuiTableCell-root": {
            borderBottom: isDarkMode
              ? "1px solid #1A2F2E"
              : "1px solid #D7EBE9",
            color: isDarkMode ? "#8FD0C8" : "#2A5954",
            padding: "12px",
          },
          "& .RaDatagrid-tbody tr:hover": {
            backgroundColor: isDarkMode ? "#315754" : "#D7EBE9",
            transition: "background-color 0.2s ease",
          },
          "& .RaDatagrid-tbody .MuiButton-root": isDarkMode
            ? {
                color: "#8FD0C8",
              }
            : {},
        }}
      >
        <RA_TextField source="id" />
        <RA_TextField source="name" />
        <RA_TextField source="description" />
        <ImageField
          source="imageUrl"
          label="Image"
          sx={{ "& img": { maxWidth: "75%", height: "auto" } }}
        />
        <BooleanField
          source="isDraft"
          sx={{
            "& .MuiTableCell-root": {
              minWidth: "120px",
              width: "120px",
            },
          }}
        />
        <DateField source="createdAt" showTime />
        <DateField source="updatedAt" showTime />
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
