import { Schema, Types, model, Document } from "mongoose";

export interface IBistro extends Document {
  name: string;
  description: string;
  location: string;
  employees: Types.ObjectId[];
  numEmployees: number;
}

const BistroSchema = new Schema<IBistro>(
  {
    name: {
      type: String,
      required: true,
      minLength: [6, "Name must be at least 6 characters long"],
      maxLength: [10, "Name must be at most 10 characters long"],
    },
    description: {
      type: String,
      required: true,
      minLength: [1, "Description is required"],
      maxLength: [256, "Description must be at most 256 characters long"],
    },
    location: {
      type: String,
      required: true,
      minLength: [1, "Location is required"],
      maxLength: [256, "Location must be at most 256 characters long"],
    },
    employees: {
      type: [Schema.Types.ObjectId],
      ref: "Employee",
      required: true,
      default: [],
    },
    numEmployees: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Bistros",
  }
);

export default model<IBistro>("Bistro", BistroSchema);
