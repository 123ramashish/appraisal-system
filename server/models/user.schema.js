import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["admin", "supervisor", "peer", "junior", "participant"],
    },
    id: {
      type: String,
      unique: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User ", // Reference to the User model
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User ", UserSchema);
export default User;
