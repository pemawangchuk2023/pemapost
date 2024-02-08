import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Post' }],
    default: [],
  },
  savedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Post' }],
    default: [],
  },
  likePosts: {
    type: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Post' }],
    default: [],
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }],
    default: [],
  },
  following: {
    type: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;