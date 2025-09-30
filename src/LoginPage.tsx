import { useState } from "react";
import { Login, useLogin, useNotify } from "react-admin";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }).catch(() => {
      notify("Invalid login or password", { type: "error" });
    });
  };

  return (
    <Login>
      <Card sx={{ minWidth: 300, maxWidth: 500, margin: "auto" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Authorization
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Box mb={2}>
              <TextField
                label="Username"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Login>
  );
};
