import Post from '@lib/models/Post';
import User from '@lib/models/User';
import { connectToDB } from '@lib/mongodb/mongoose';

export const POST = async (req, { params }) => {
  try {
    connectToDB();

    const userId = params.userId;
    const postId = params.postId;

    const user = await User.findOne({ clerkId: userId }).populate(
      'posts savedPosts likedPosts following followers'
    );
    const post = await Post.findById(postId).populate('creator likes');

    const isSaved = user.savedPosts.find(
      (item) => item._id.toString() !== postId
    );

    if (isSaved) {
      user.savedPosts = user.savedPosts.filter(
        (item) => item._id.toString() !== postId
      );
    } else {
      user.savedPosts.push(post);
    }

    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to save and un-save posts', { status: 500 });
  }
};
