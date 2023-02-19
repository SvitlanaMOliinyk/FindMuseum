import mongoose from "mongoose";
const { SchemaTypes } = mongoose;
const museumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    street: { type: String, required: true },
  },
  phone: { type: Number, required: true },
  website: { type: String, required: true },
  price: {
    children: Number,
    students: Number,
    adults: { type: Number, required: true },
  },
  rating: { type: Number, required: true },
  image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  openingHours: [{ day: String, hours: String }],
  comments: {
    type: [SchemaTypes.ObjectId],
    ref: "Comment",
  },
});
const Museum = mongoose.model("museums", museumSchema);
export default Museum;