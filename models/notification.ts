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
  receiverEmail: {
    required: true,
    type: String,
  },
  senderEmail: {
    required: true,
    type: String,
  },
  notification: {
    required: true,
    type: String,
  },
  isRead: {
    required: true,
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
