import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuid } from "uuid";
import { UserDocument } from "./user.model";

export interface ProductDocument extends Document {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${uuid()}`,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
