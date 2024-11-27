import {useState} from "react";
import {Box, Button, IconButton, InputAdornment, TextField, Typography,} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link} from "react-router-dom";

export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f8f9fc"
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
                <Box textAlign="left" mb={4}>
                    <Typography variant="h5" fontWeight="600">
                        Register
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Create your Trade Mate account to get started.
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
                        placeholder="Enter your email address"
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
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        margin="normal"
                        size="small"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3}}
                        type="button"
                    >
                        Register
                    </Button>
                </Box>

                <Typography variant="body2" textAlign="center" mb={2}>
                    Already have an account?{" "}
                    <strong>
                        <Link to="/">Log in</Link>
                    </strong>
                </Typography>
            </Box>
        </Box>
    );
};
