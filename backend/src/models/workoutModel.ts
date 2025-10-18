import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  reps: number;
  sets: number;
  weight: number;
  date: Date;
  exercises: any[];
  user: mongoose.Types.ObjectId;
}

const workoutSchema: Schema = new Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  sets: { type: Number, required: true },
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
