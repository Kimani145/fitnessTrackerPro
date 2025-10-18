import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import workoutRoutes from './routes/workoutRoutes';
import userRoutes from './routes/userRoutes';
import goalRoutes from './routes/goalRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import achievementRoutes from './routes/achievementRoutes';
import postRoutes from './routes/postRoutes';
import errorMiddleware from './middleware/errorMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/posts', postRoutes);

// error middlewares
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});