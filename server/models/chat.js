import { Schema, Types, model, models } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        typpe: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Chat = models.Chat || model("Chat", schema);
