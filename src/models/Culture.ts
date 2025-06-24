import mongoose, { Document, Schema } from 'mongoose';

export interface ICulture extends Document {
  name: string;
  country: string;
  continent: string;
  description: string;
  imageUrl: string;
  colors: string[];
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  popularity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const cultureSchema = new Schema<ICulture>({
  name: {
    type: String,
    required: [true, 'Please add a culture name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
    trim: true
  },
  continent: {
    type: String,
    required: [true, 'Please add a continent'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  colors: [{
    type: String,
    required: [true, 'Please add colors']
  }],
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Wedding', 'Festival', 'Traditional', 'Modern', 'Celebration', 'Ceremony']
  },
  difficulty: {
    type: String,
    required: [true, 'Please add difficulty level'],
    enum: ['Easy', 'Medium', 'Advanced'],
    default: 'Medium'
  },
  popularity: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
cultureSchema.index({ country: 1, continent: 1 });
cultureSchema.index({ category: 1 });
cultureSchema.index({ popularity: -1 });

export const Culture = mongoose.model<ICulture>('Culture', cultureSchema); 