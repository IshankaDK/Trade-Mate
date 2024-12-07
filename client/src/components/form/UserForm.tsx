import React, { useState } from "react";
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

export interface UserProps {
    displayName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string | null;
    address: string;
}

export interface UpdateUserFormProps {
    open: boolean;
    onClose: () => void;
    user: UserProps;
}

export const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
    open,
    onClose,
    user,
}) => {
    const [formData, setFormData] = useState<UserProps>(user);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.table(formData);
        // onUpdate(formData); // Pass updated data to parent component
        onClose(); // Close the dialog
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
        >
    ) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update User Details</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4 min-w-[400px] mt-2">
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Display Name"
                            size="small"
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Box>
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
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Phone Number"
                            size="small"
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            fullWidth
                            required
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
                                        dateOfBirth: newValue?.toISOString() || null,
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
