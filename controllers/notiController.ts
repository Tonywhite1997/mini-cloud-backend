import { Request, NextFunction, Response } from "express";

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Notification = require("../models/notification");
const User = require("../models/user");

exports.sendNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { receiverEmail, message } = req.body;

    try {
      if (!receiverEmail && !message)
        return next(new AppError("receiver id and message required", 401));

      const receiverData = await User.findOne({ email: receiverEmail });

      if (!receiverData) return next(new AppError("invalid user", 404));

      const notification = await Notification.create({
        sender: req.user._id,
        receiver: receiverData._id,
        notification: message,
      });

      res.status(200).json({
        notification,
      });
    } catch (error) {
      console.log(error);
      return next(new AppError("error occured", 500));
    }
  }
);

exports.getMyNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notifications = await Notification.find({ receiver: req.user._id });

    res.status(200).json({
      message: "ok",
      notifications,
    });
  }
);

exports.clearMyNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Notification.deleteMany({ receiver: req.user?._id });

      res.status(200).json({
        message: "ok",
      });
    } catch (error) {
      return next(new AppError("An error occured", 500));
    }
  }
);
