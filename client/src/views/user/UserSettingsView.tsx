import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { Edit } from "lucide-react";
import { UserDto } from "../../types/UserDto.ts";
import { CurrencyPairView } from "../currencypair/CurrencyPairView.tsx";
import { UpdateUserForm } from "../../components/form/UserForm.tsx";
import APIClient from "../../util/APIClient.ts";

export const UserSettingsView: React.FC = () => {
  const [user, setUser] = useState<UserDto>({
    id: 0,
    fullName: "N/A",
    email: "",
    mobile: "N/A",
    dateOfBirth: new Date(),
    address: "N/A",
  });
  const [date, setDate] = useState<string>(new Date().toLocaleString());
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Load user details from API
  const loadUserDetails = () => {
    APIClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const user: UserDto = response.data.data;
        setUser(user);
      })
      .catch((error) => {
        console.error("Failed to load user details:", error);
      });
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  // Update the displayed date every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="m-2 sm:grid-cols-1 lg:grid-cols-4 grid border rounded bg-gray-50/50">
      {/* Sidebar */}
      <div className="w-full lg:w-[300px] border-b lg:border-b-0 bg-white p-6">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16 bg-blue-500">AB</Avatar>
            <div>
              <h1 className="text-xl font-semibold">{user?.fullName}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 border rounded p-4">
          <h1 className="text-sm font-semibold text-gray-500">Total Profit</h1>
          <h1 className="font-semibold text-2xl text-blue-600">
            12.395769 BTC
          </h1>
          <p className="text-gray-600">{date}</p>
        </div>

        <div className="mb-6 border rounded p-4">
          <CurrencyPairView />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 lg:px-8 lg:col-span-3">
        <div className="max-w-5xl mb-6">
          <div className="flex flex-row justify-between">
            <h4 className="font-semibold text-xl">Personal Information</h4>
            <div className="text-gray-600">
              <IconButton color="primary" onClick={() => setModalOpen(true)}>
                <Edit />
              </IconButton>
            </div>
          </div>

          {/* User Information */}
          <div className="mt-4 space-y-4">
            {[
              { label: "Full Name", value: user.fullName || "N/A" },
              { label: "Email", value: user.email || "N/A" },
              { label: "Mobile", value: user.mobile || "N/A" },
              {
                label: "Date of Birth",
                value: user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "N/A",
              },
              { label: "Address", value: user.address || "N/A" },
            ].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 items-center py-3 border-b"
              >
                <div className="col-span-4 text-sm font-medium capitalize text-gray-700">
                  {item.label}
                </div>
                <div className="col-span-6 text-sm text-gray-900 break-words">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Update User Modal */}
      <UpdateUserForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
        refresh={loadUserDetails}
      />
    </div>
  );
};
