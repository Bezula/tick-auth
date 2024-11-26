import mongoose from "mongoose";
import { Password } from "../services/password";

type UserAttrs = {
  email: string;
  password: string;
};

type UserDoc = {
  email: string;
  password: string;
} & mongoose.Document;

type UserModel = {
  build(attrs: UserAttrs): UserDoc;
} & mongoose.Model<UserDoc>;

const userSchema = new mongoose.Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  next();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
