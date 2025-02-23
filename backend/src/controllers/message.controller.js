import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const userId = req.user._id;

    const messages = Message.find({
      $or: [
        { senderId: userId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: userId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getting messages", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching messages." });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const { text, image } = req.body;
    const userId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: userId,
      recieverId,
      text: text,
      image: imageUrl,
    });

    await newMessage.save();

    res.staus(200).json(newMessage);

    //todo: Real Time functionality with socket.io
  } catch (error) {
    console.error("Error in sending message", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while sending message." });
  }
};
