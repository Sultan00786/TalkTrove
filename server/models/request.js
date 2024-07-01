import { Schema } from "mongoose";

const schema = new Schema(
  {
    status: {
      type: String,
      default: "pendding",
      enum: ["pendding", "accepted", "rejected"],
    },

    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Request = models.Request || model("Request", schema);
