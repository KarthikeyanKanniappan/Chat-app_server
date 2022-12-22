import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

export const accessChats = async (req, res) => {
  const { userId } = req.body;
  console.log(req.user._id);
  try {
    if (!userId) {
      return res.sendStatus(400);
    }
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).send(FullChat);
      } catch (err) {
        res.status(400);
        throw new Error(err.message);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
