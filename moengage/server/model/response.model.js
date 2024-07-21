import mongoose, { Schema } from "mongoose";

const responseCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

export const ResponseCode = mongoose.model("ResponseCode", responseCodeSchema);
