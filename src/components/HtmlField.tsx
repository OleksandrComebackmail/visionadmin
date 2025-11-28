import { useRecordContext } from "react-admin";
import { Box, Typography } from "@mui/material";

interface HtmlFieldProps {
  source: string;
  label?: string;
}

export const HtmlField = ({ source, label }: HtmlFieldProps) => {
  const record = useRecordContext();
  const value = record?.[source];

  if (!value) return null;

  return (
    <Box sx={{ mb: 2 }}>
      {label && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mb: 0.5,
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          {label}
        </Typography>
      )}
      <Box
        sx={{
          "& div": {
            margin: 0,
          },
          "& br": {
            display: "block",
            content: '""',
            marginTop: "0.5em",
          },
        }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </Box>
  );
};
