import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: String, required: true },
  level: { type: String, required: true }
}, { collection: 'users' });

const teamSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  members: { type: [String], required: true },
  points: { type: Number, required: true }
}, { collection: 'teams' });

const activitySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  points: { type: Number, required: true },
  date: { type: String, required: true }
}, { collection: 'activities' });

const leaderboardSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  team: { type: String, required: true },
  streak: { type: Number, required: true }
}, { collection: 'leaderboard' });

const workoutSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  focus: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, required: true }
}, { collection: 'workouts' });

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const TeamModel = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const ActivityModel = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardModel = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const WorkoutModel = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);