import { Schema, model, Document } from 'mongoose';

export interface IProperty extends Document {
  _id?: string;
  owner: Schema.Types.ObjectId;
  place: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  nearbyAmenities: string;
  likes: number;
}

const propertySchema = new Schema<IProperty>(
  {
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    place: { type: String, required: true },
    area: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    nearbyAmenities: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Property = model<IProperty>('Property', propertySchema);

export default Property;
