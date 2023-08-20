import mongoose from 'mongoose';

const { Schema } = mongoose;
const wishListItemSchema = new Schema({
  gameNumber: {
    type: Number,
    required: true,
  },
  addedAt: {
    type: Date,
    default: () => {
      const now = new Date();
      const utcOffset = 2;
      const localTime = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);
      return localTime;
    },
  },
});

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    wishLists: [wishListItemSchema],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
