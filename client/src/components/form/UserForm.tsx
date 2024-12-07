import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { UserDto } from "../../types/UserDto";
import APIClient from "../../util/APIClient";
import { toast } from "react-toastify";
import { UpdateUserFormProps } from "../../types/UpdateUserFormProps.ts";

export const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  open,
  onClose,
  user,
  refresh,
}) => {
  const [formData, setFormData] = useState<UserDto>(user);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation function
  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.fullName) {
      errors.fullName = "Full Name is required";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.mobile || !phoneRegex.test(formData.mobile)) {
      errors.mobile = "Please enter a valid 10-digit phone number";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    }

    if (formData.dateOfBirth && !dayjs(formData.dateOfBirth).isValid()) {
      errors.dateOfBirth = "Invalid Date of Birth";
    }

    return errors;
  };

  // Update user details
  const updateUserDetails = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSubmit = {
      fullName: formData.fullName,
      mobile: formData.mobile,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
    };

    APIClient.patch("/users", formDataToSubmit, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        console.log("User details updated successfully.");
        toast.success("User details updated successfully.");
        refresh();
        onClose();
      })
      .catch((error) => {
        console.error("Failed to update user details:", error);
        toast.error("Failed to update user details.");
      });
  };

  useEffect(() => {
    setFormData(user);
    setErrors({});
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserDetails();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update User Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4 min-w-[400px] mt-2">
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Full Name"
              size="small"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Phone Number"
              size="small"
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Date of Birth"
                value={
                  formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null
                }
                onChange={(newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    dateOfBirth: newValue ? newValue.toDate() : null,
                  }));
                  // Clear error when user selects date
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    dateOfBirth: "",
                  }));
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Address"
              size="small"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
              error={!!errors.address}
              helperText={errors.address}
            />
          </Box>
          <Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
