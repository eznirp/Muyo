import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Article name is required'],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    content: {
      type: [String],
      required: [true, 'Article content is required'],
    },
    image: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Article', articleSchema);
