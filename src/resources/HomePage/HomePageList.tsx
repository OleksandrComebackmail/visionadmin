import { Box } from "@mui/material";
import { TestimonialsListTable } from "@/resources/HomePage/testimonials/TestimonialsTable.tsx";
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
        <TestimonialsListTable />
      </Box>
    </Box>
  );
};
