import {
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  EditButton,
  ImageField,
  Pagination,
  DeleteButton,
} from "react-admin";
import { useTheme } from "@mui/material/styles";

const AuthorQuotePagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

export const AuthorQuoteList = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <List
      pagination={<AuthorQuotePagination />}
      perPage={10}
      sort={{ field: "createdAt", order: "DESC" }}
      sx={{
        padding: "16px",
        borderRadius: "8px",
        "& .RaList-main": {
          boxShadow: isDarkMode
            ? "0 2px 10px rgba(0, 0, 0, 0.3)"
            : "0 2px 10px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: isDarkMode ? "#263538" : "#E8F5F2",
        },
      }}
    >
      <Datagrid
        rowClick="edit"
        sx={{
          "& .column-id": {
            maxWidth: "120px",
            width: "110px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
          "& .column-author": {
            minWidth: "240px",
            width: "240px",
          },
          "& .column-imageUrl": {
            minWidth: "260px",
            width: "260px",
          },
          "& .column-isDraft": {
            minWidth: "120px",
            width: "120px",
          },
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
          "& .RaDatagrid-tbody .RaShowButton-root, & .RaDatagrid-tbody .RaEditButton-root, & .RaDatagrid-tbody .css-13vpg2j-MuiButtonBase-root-MuiButton-root-RaButton-root-RaShowButton-root.MuiButton-sizeSmall":
            isDarkMode
              ? {
                  color: "#8FD0C8",
                }
              : {},
        }}
      >
        <TextField source="id" />
        <TextField source="text" />
        <TextField source="author" />
        <ImageField
          source="imageUrl"
          label="Image"
          sx={{ "& img": { maxWidth: "90%", height: "auto" } }}
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
