import { Box } from "@mui/material";
import { TestimonialsListTable } from "@/resources/HomePage/testimonials/TestimonialsTable.tsx";
import { HomePageContent } from "@/resources/HomePage/HomePageContent.tsx";
import FAQTable from "@/resources/HomePage/faq/FAQTable";
export const HomePageList = () => {
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
        <HomePageContent />
        <TestimonialsListTable />
        <FAQTable />
      </Box>
    </Box>
  );
};
