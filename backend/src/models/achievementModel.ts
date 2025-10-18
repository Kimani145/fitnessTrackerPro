import { Schema, model, Document, Types } from 'mongoose';

interface IAchievement extends Document {
  user: Types.ObjectId;
  achievementType: string;
  date: Date;
}

const achievementSchema = new Schema<IAchievement>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  achievementType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Achievement = model<IAchievement>('Achievement', achievementSchema);

export default Achievement;
