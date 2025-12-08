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
  Rating,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

interface TestimonialRecord extends RaRecord {
  name: string;
  position: string;
  description: string;
  rate: number;
  videoUrl: string;
  order: number;
}

export const ShowTestimonials = ({
  open,
  onClose,
  record,
}: {
  open: boolean;
  onClose: () => void;
  record: TestimonialRecord | null;
}) => {
  if (!record) return null;

  const isVideoFile = record.videoUrl?.match(/\.(mp4|mov|webm)$/i);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Testimonial Details
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
            {record.videoUrl ? (
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  overflow: "hidden",
                  boxShadow: 2,
                  bgcolor: "black",
                  minHeight: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isVideoFile ? (
                  <video
                    src={record.videoUrl}
                    controls
                    style={{ width: "100%", maxHeight: "300px" }}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                      p: 2,
                      textAlign: "center",
                    }}
                  >
                    <PlayCircleOutlineIcon sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="caption">
                      External Video Link
                    </Typography>
                    <Link
                      href={record.videoUrl}
                      target="_blank"
                      rel="noopener"
                      color="inherit"
                      sx={{
                        mt: 1,
                        wordBreak: "break-all",
                        fontSize: "0.75rem",
                      }}
                    >
                      Open Link
                    </Link>
                  </Box>
                )}
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
                <Typography color="text.secondary">No Video</Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {record.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {record.position}
                </Typography>
              </Box>
              <Chip
                label={`Order: ${record.order}`}
                size="small"
                variant="outlined"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 1 }}>
              <Rating value={record.rate} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({record.rate} / 5)
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 2 }}>
              {record.description}
            </Typography>

            {record.videoUrl && !isVideoFile && (
              <Box sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Video Source:
                </Typography>
                <Link href={record.videoUrl} target="_blank" rel="noopener">
                  {record.videoUrl}
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
