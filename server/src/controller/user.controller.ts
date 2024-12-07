import { Request, Response } from "express";
import User from "../models/User";
import { getClaimsFromToken } from "../utils/Jwt.utils";

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const token: string = req.headers.authorization?.split(" ")[1] || "";
    const claims = getClaimsFromToken(token);
    if (!claims) {
      return res.status(401).json({
        data: null,
        message: "Invalid token.",
        status: 401,
      });
    }

    const email = claims.email;

    const user = await User.findOne({
      where: { email },
      attributes: [
        "id",
        "email",
        "fullName",
        "dateOfBirth",
        "mobile",
        "address",
      ],
    });

    if (!user) {
      return res.status(404).json({
        data: null,
        message: "User not found.",
        status: 404,
      });
    }

    res.status(200).json({
      data: user,
      message: "User details retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);

    res.status(500).json({
      data: null,
      message: "An unexpected error occurred.",
      status: 500,
    });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const token: string = req.headers.authorization?.split(" ")[1] || "";
    
    const claims = getClaimsFromToken(token);
    if (!claims) {
      return res.status(401).json({
        data: null,
        message: "Invalid token.",
        status: 401,
      });
    }

    const email = claims.email;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        data: null,
        message: "User not found.",
        status: 404,
      });
    }

    const { fullName, dateOfBirth, mobile, address } = req.body;

    user.fullName = fullName;
    user.dateOfBirth = dateOfBirth;
    user.mobile = mobile;
    user.address = address;

    await user.save();

    res.status(200).json({
      data: user,
      message: "User details updated successfully.",
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user details:", error);

    res.status(500).json({
      data: null,
      message: "An unexpected error occurred.",
      status: 500,
    });
  }
};
