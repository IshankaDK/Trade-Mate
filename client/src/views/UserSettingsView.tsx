import Avatar from "@mui/material/Avatar";
import { CircleChevronRight, Edit, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CurrencyPairView } from "./currencypair/CurrencyPairView";
import { IconButton } from "@mui/material";
import { UpdateUserForm, UserProps } from "../components/form/UserForm";

interface DetailsSectionProps {
    title: string;
    data: Record<string, string>;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ title, data }) => (
    <div className="my-6">
        {/* Section Header */}
        {/* <div className="border-b pb-4">
      <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wide bg-gray-100 p-1 rounded">
        {title}
      </h5>
    </div> */}

        <div className="mt-4 space-y-4">
            {Object.entries(data).map(([key, value]) => (
                <div
                    key={key}
                    className="grid grid-cols-12 gap-4 items-center py-3 border-b"
                >
                    <div className="col-span-4 text-sm font-medium capitalize text-gray-700">
                        {key.replace(/([A-Z])/g, " $1")}
                    </div>

                    <div className="col-span-6 text-sm text-gray-900 break-words">
                        {value}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const UserSettingsView: React.FC = () => {
    const user = {
        displayName: "Kasun DK",
        fullName: "Kasun Dilshan",
        email: "kasun.dilshan@example.com",
        phoneNumber: "+94 71 234 5678",
        dateOfBirth: "1995-10-15",
        address: "123 Main Street, Colombo, Sri Lanka",
    };

    const preferences = {
        language: "EN",
        dateFormat: "MM/DD/YYYY",
        timeZone: "Asia/Colombo",
        currency: "USD",
    };

    const [date, setDate] = useState<string>(new Date().toString());
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date().toString());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="m-2 sm:grid-cols-1 lg:grid-cols-4 grid border rounded bg-gray-50/50">
            <div className="w-full lg:w-[300px] border-b lg:border-b-0 bg-white p-6">
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-16 w-16 bg-blue-500">AB</Avatar>
                        <div>
                            <h1 className="text-xl font-semibold">{user.displayName}</h1>
                            <p className="text-gray-600">{user.email}</p>
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

            <div className="p-6 lg:px-8 lg:col-span-3">
                <div className="max-w-5xl mb-6">
                    <div className="flex flex-row justify-between">
                        <h4 className="font-semibold text-xl">Personal Information</h4>
                        <div className="text-gray-600">
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                            >
                                <Edit />
                            </IconButton>
                            <div className="col-span-2"></div>
                        </div>
                    </div>

                    <DetailsSection title="General Information" data={user} />
                    {/* <DetailsSection title="Preferences" data={preferences} /> */}
                </div>
            </div>
            <UpdateUserForm
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                user={user}
            />
        </div>
    );
};
