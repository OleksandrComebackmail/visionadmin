import { useRecordContext } from "react-admin";
import {
  Box,
  Typography,
  SxProps,
  Theme,
  SystemStyleObject,
} from "@mui/material";

interface HtmlFieldProps {
  source: string;
  label?: string;
  disableLabel?: boolean;
  sx?: SxProps<Theme>;
}

export const HtmlField = ({
  source,
  label,
  disableLabel,
  sx,
}: HtmlFieldProps) => {
  const record = useRecordContext();
  const value = record?.[source];

  if (!value) return null;

  const defaults: SystemStyleObject<Theme> = {
    "& p": { margin: 0 },
    "& br": { display: "block", content: '""', marginTop: "0.5em" },
  };

  const mergedSx = (theme: Theme) => {
    if (!sx) return defaults;

    if (Array.isArray(sx)) {
      return sx.reduce<SystemStyleObject<Theme>>((acc, item) => {
        if (!item) return acc;
        if (typeof item === "function")
          return { ...acc, ...(item(theme) as any) };
        return { ...acc, ...(item as any) };
      }, defaults);
    }

    if (typeof sx === "function") {
      return { ...defaults, ...(sx(theme) as any) };
    }

    return { ...defaults, ...(sx as any) };
  };

  return (
    <Box sx={{ mb: 2 }}>
      {label && !disableLabel && (
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

      <Typography
        component="div"
        sx={mergedSx}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </Box>
  );
};