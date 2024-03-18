import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      require: false,
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_960_720.png&tbnid=GonJG9aLPTc5LM&vet=12ahUKEwj59_7DjNaEAxUPe2wGHQ_LDgEQMygAegQIARBx..i&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&docid=wg0CyFWNfK7o5M&w=720&h=720&q=profile%20image&ved=2ahUKEwj59_7DjNaEAxUPe2wGHQ_LDgEQMygAegQIARBx",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
