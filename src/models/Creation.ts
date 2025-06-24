import mongoose, { Document, Schema } from 'mongoose';

export interface ICreation extends Document {
  user: mongoose.Types.ObjectId;
  originalImage: string;
  styledImage: string;
  continent: string;
  country: string;
  culture: string;
  event: string;
  pose: string;
  outfit: string;
  filter: string;
  customText?: string;
  occasion?: string;
  isFavorite: boolean;
  isPublic: boolean;
  likes: number;
  downloads: number;
  shares: number;
  createdAt: Date;
  updatedAt: Date;
}

const creationSchema = new Schema<ICreation>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add a user']
  },
  originalImage: {
    type: String,
    required: [true, 'Please add original image']
  },
  styledImage: {
    type: String,
    required: [true, 'Please add styled image']
  },
  continent: {
    type: String,
    required: [true, 'Please add continent']
  },
  country: {
    type: String,
    required: [true, 'Please add country']
  },
  culture: {
    type: String,
    required: [true, 'Please add culture']
  },
  event: {
    type: String,
    required: [true, 'Please add event']
  },
  pose: {
    type: String,
    required: [true, 'Please add pose']
  },
  outfit: {
    type: String,
    required: [true, 'Please add outfit']
  },
  filter: {
    type: String,
    required: [true, 'Please add filter']
  },
  customText: {
    type: String,
    maxlength: [200, 'Custom text cannot be more than 200 characters']
  },
  occasion: {
    type: String,
    maxlength: [100, 'Occasion cannot be more than 100 characters']
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
creationSchema.index({ user: 1, createdAt: -1 });
creationSchema.index({ culture: 1, createdAt: -1 });
creationSchema.index({ isPublic: 1, likes: -1 });
creationSchema.index({ isFavorite: 1, user: 1 });

export const Creation = mongoose.model<ICreation>('Creation', creationSchema); 