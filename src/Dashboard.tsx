import { Card, CardContent, Typography } from "@mui/material";
import { Title } from "react-admin";

export const Dashboard = () => (
  <Card>
    <Title title="Dashboard" />
    <CardContent>
      <Typography variant="h5">Welcome to the admin panel</Typography>
      <Typography variant="body1">
        Use the menu on the left to navigate through the system.
      </Typography>
    </CardContent>
  </Card>
);
