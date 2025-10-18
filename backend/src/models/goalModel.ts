import { Schema, model, Document, Types } from 'mongoose';

interface IGoal extends Document {
  user: Types.ObjectId;
  goalType: string;
  target: number;
  currentValue: number;
  deadline: Date;
  isAchieved: boolean;
}

const goalSchema = new Schema<IGoal>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  goalType: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  currentValue: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  isAchieved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Goal = model<IGoal>('Goal', goalSchema);

export default Goal;
