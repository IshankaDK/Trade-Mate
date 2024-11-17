import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, LineChart, LogOut, Settings } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-blue-500">Trade Mate</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden  md:flex md:items-end md:space-x-6">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
          >
            <LineChart className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/journal"
            className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
          >
            <BookOpen className="h-4 w-4" />
            <span>Journal</span>
          </Link>
          <Link
            to="/playbook"
            className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
          >
            <Settings className="h-4 w-4" />
            <span>Playbook</span>
          </Link>
        </div>

        {/* User Options */}
        <div className="flex  items-center space-x-4">
          {/* User Avatar Dropdown */}
          <div>
            <IconButton onClick={(e) => handleMenuOpen(e)} size="small">
              <Avatar
                alt="User Avatar"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=80&q=80&w=80"
                className="h-8 w-8"
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  width: "150px",
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <Divider />

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                }}
              >
                <Link to="/" className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};
