import Achievement from '../models/achievementModel';
import Workout from '../models/workoutModel';

const checkAndAwardWorkoutAchievements = async (userId: string) => {
  const workoutCount = await Workout.countDocuments({ user: userId });

  if (workoutCount === 1) {
    await Achievement.create({
      user: userId,
      achievementType: 'First Workout',
    });
  }

  if (workoutCount === 10) {
    await Achievement.create({
      user: userId,
      achievementType: '10 Workouts',
    });
  }
};

const checkAndAwardGoalAchievements = async (userId: string) => {
  await Achievement.create({
    user: userId,
    achievementType: 'Goal Achieved',
  });
};

const getAchievements = async (userId: string) => {
  return await Achievement.find({ user: userId });
};

export { checkAndAwardWorkoutAchievements, checkAndAwardGoalAchievements, getAchievements };
