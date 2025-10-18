import Goal from '../models/goalModel';

const createGoal = async (userId: string, goalType: string, target: number, currentValue: number, deadline: Date) => {
  const goal = new Goal({
    user: userId,
    goalType,
    target,
    currentValue,
    deadline,
  });
  return await goal.save();
};

const getGoals = async (userId: string) => {
  return await Goal.find({ user: userId });
};

const getGoalById = async (userId: string, goalId: string) => {
  return await Goal.findOne({ _id: goalId, user: userId });
};

const updateGoal = async (userId: string, goalId: string, currentValue: number) => {
  const goal = await Goal.findOne({ _id: goalId, user: userId });

  if (goal) {
    goal.currentValue = currentValue;
    if (goal.currentValue >= goal.target) {
      goal.isAchieved = true;
    }
    return await goal.save();
  }

  return null;
};

const deleteGoal = async (userId: string, goalId: string) => {
  const goal = await Goal.findOne({ _id: goalId, user: userId });

  if (goal) {
    await goal.remove();
    return true;
  }

  return false;
};

export { createGoal, getGoals, getGoalById, updateGoal, deleteGoal };
