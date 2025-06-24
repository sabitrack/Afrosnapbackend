import mongoose, { Document, Schema } from 'mongoose';

export interface IContinent extends Document {
  name: string;
  emoji: string;
  colors: string[];
  countries: string[];
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const continentSchema = new Schema<IContinent>({
  name: {
    type: String,
    required: [true, 'Please add a continent name'],
    unique: true,
    trim: true
  },
  emoji: {
    type: String,
    required: [true, 'Please add an emoji'],
    trim: true
  },
  colors: [{
    type: String,
    required: [true, 'Please add colors']
  }],
  countries: [{
    type: String,
    required: [true, 'Please add countries']
  }],
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Continent = mongoose.model<IContinent>('Continent', continentSchema); 