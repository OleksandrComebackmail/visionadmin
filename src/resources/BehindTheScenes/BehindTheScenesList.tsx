import { Box } from "@mui/material";
import { EpisodeDialogTable } from "@/resources/BehindTheScenes/episodes/EpisodeDialogTable.tsx";
import { BehindPageSection } from "@/resources/BehindTheScenes/journey/BehindPageSection.tsx";

export const BehindTheScenesList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <BehindPageSection />

      <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
        <EpisodeDialogTable />
      </Box>
    </Box>
  );
};
