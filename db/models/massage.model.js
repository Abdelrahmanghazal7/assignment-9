import { Schema, model } from "mongoose";

const massageSchema = Schema({
  content: {
    type: String,
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const massageModel = model("massage", massageSchema);

export default massageModel;
