import { Box } from "@mui/material";
import { EpisodeDialogTable } from "@/resources/BehindTheScenes/episodes/EpisodeDialogTable.tsx";
import { BehindPageSection } from "@/resources/BehindTheScenes/journey/BehindPageSection.tsx";
import { NewsListTable } from "@/resources/BehindTheScenes/news/NewsListTable.tsx";
import { SubscribeNowSection } from "@/resources/BehindTheScenes/subscribeNow /SubscribeNowSection.tsx"; // Імпорт нової таблиці

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
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: 4,
        }}
      >
        <BehindPageSection />

        <EpisodeDialogTable />

        <NewsListTable />

        <SubscribeNowSection />
      </Box>
    </Box>
  );
};
