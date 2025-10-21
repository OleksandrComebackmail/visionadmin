import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  ShowButton,
  BooleanInput,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import ArchiveButton from "./ArchiveButton";
import UnarchiveButton from "./UnarchiveButton";

const BoardServiceFilters = [
  <BooleanInput
    key="includeArchived"
    source="includeArchived"
    label="Show Archived Services"
    alwaysOn
    sx={{
      "& .MuiFormControlLabel-root": { ml: "0px" },
      "&.MuiFormControlLabel-root": { ml: "0px" },
    }}
  />,
];

export const BoardServiceList = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <List
      filters={BoardServiceFilters}
      filterDefaultValues={{ includeArchived: false }}
      sx={{
        padding: "16px",
        borderRadius: "8px",
        "& .RaList-main": {
          boxShadow: isDarkMode
            ? "0 2px 10px rgba(0,0,0,.3)"
            : "0 2px 10px rgba(0,0,0,.08)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: isDarkMode ? "#263538" : "#E8F5F2",
        },

        "& .RaFilterForm-root .MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd":
          {
            marginLeft: "0px",
          },
      }}
    >
      <Datagrid
        rowClick={false}
        sx={{
          "& .column-isActive": { minWidth: "120px", width: "120px" },
          "& .RaDatagrid-headerCell": {
            backgroundColor: isDarkMode ? "#214849" : "#9BB8B5",
            color: "white",
            fontWeight: 500,
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
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <BooleanField source="isActive" />
        <DateField source="createdAt" showTime />
        <DateField source="updatedAt" showTime />
        <ShowButton />
        <ArchiveButton />
        <UnarchiveButton />
      </Datagrid>
    </List>
  );
};
