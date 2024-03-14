import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  sender: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  receiver: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  notification: {
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
