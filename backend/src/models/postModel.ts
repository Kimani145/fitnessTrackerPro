import { Schema, model, Document, Types } from 'mongoose';

export interface IPost extends Document {
  user: Types.ObjectId;
  content: string;
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = model<IPost>('Post', postSchema);

export default Post;
