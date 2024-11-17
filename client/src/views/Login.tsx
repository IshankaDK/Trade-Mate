import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="rgba(240, 240, 240, 0.5)"
      p={4}
    >
      <Box
        width="100%"
        maxWidth={400}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        p={4}
      >
        {/*<Box display="flex" justifyContent="center" mb={2}>
                    <img
                        src="/placeholder.svg"
                        alt="Trade Mate Logo"
                        style={{height: 40, width: "auto"}}
                    />
                </Box>*/}

        {/* Title and Description */}
        <Box textAlign="left" mb={3}>
          <Typography className={"text-2xl"} variant="h5" fontWeight="600">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Log in to track your trades and enhance your trading strategy.
          </Typography>
        </Box>

        <Box component="form" mb={4}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            size="small"
            type="email"
            placeholder="example@trademate.com"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            size="small"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="space-between" mt={1}>
            <MuiLink variant="body2" color="primary">
              Forgot Password?
            </MuiLink>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            type="button"
          >
            <Link to="/dashboard">Log In</Link>
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" mb={2}>
          New to Trade Mate?{" "}
          <strong>
            <Link to="/signup">Create an Account</Link>
          </strong>
        </Typography>
      </Box>
    </Box>
  );
};
