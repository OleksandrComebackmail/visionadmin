import { RaRecord } from "react-admin";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

export const ShowEpisodeDialog = ({
  open,
  onClose,
  record,
}: {
  open: boolean;
  onClose: () => void;
  record: Episode | null;
}) => {
  if (!record) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Episode Details
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <Box sx={{ flex: { xs: "1 1 100%", md: "0 0 300px" } }}>
            {record.imageUrl ? (
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  boxShadow: 2,
                }}
              >
                <img
                  src={record.imageUrl}
                  alt={record.name}
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  bgcolor: "grey.200",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                }}
              >
                <Typography color="text.secondary">No Image</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {record.name}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 2 }}>
              {record.description}
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Links:
            </Typography>
            {record.links &&
              record.links.map((link, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="span"
                    fontWeight="bold"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {link.platform}:
                  </Typography>{" "}
                  <Link href={link.url} target="_blank" rel="noopener">
                    {link.url}
                  </Link>
                </Box>
              ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
