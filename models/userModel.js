import mongoose from "mongoose";

const userModel = mongoose.Schema(
  {
    name: { type: "string", required: "true" },
    email: { type: "string", required: "true" },
    password: { type: "string", required: "true" },
    pic: {
      type: "string",
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqBmq3B4UOPmt2YOCVPpJaSZe1hpx6huLFOw&usqp=CAU",
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userModel);

export default User;
