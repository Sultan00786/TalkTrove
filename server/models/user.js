import { hash } from "bcrypt";
import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await hash(this.password, 10);
});

export const User = mongoose.models.User || model("User", schema);
