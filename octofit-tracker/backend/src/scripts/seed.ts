import mongoose from 'mongoose';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({})
    ]);

    await UserModel.insertMany([
      { id: 1, name: 'Ava Thompson', email: 'ava@octofit.com', team: 'Blue Sharks', level: 'Advanced' },
      { id: 2, name: 'Noah Lee', email: 'noah@octofit.com', team: 'Red Hawks', level: 'Intermediate' },
      { id: 3, name: 'Mila Patel', email: 'mila@octofit.com', team: 'Green Falcons', level: 'Beginner' }
    ]);
    await TeamModel.insertMany([
      { id: 1, name: 'Blue Sharks', members: ['Ava Thompson', 'Ethan Park'], points: 1240 },
      { id: 2, name: 'Red Hawks', members: ['Noah Lee', 'Sofia Nguyen'], points: 1185 },
      { id: 3, name: 'Green Falcons', members: ['Mila Patel', 'Leo Garcia'], points: 1108 }
    ]);
    await ActivityModel.insertMany([
      { id: 1, userId: 1, type: 'run', duration: 32, points: 240, date: '2026-09-18' },
      { id: 2, userId: 2, type: 'workout', duration: 45, points: 300, date: '2026-09-19' },
      { id: 3, userId: 3, type: 'cycling', duration: 25, points: 210, date: '2026-09-20' }
    ]);
    await LeaderboardModel.insertMany([
      { id: 1, name: 'Ava Thompson', points: 1240, team: 'Blue Sharks', streak: 12 },
      { id: 2, name: 'Noah Lee', points: 1185, team: 'Red Hawks', streak: 9 },
      { id: 3, name: 'Mila Patel', points: 1108, team: 'Green Falcons', streak: 7 }
    ]);
    await WorkoutModel.insertMany([
      { id: 1, title: 'Interval Sprint Circuit', focus: 'Cardio', duration: 25, difficulty: 'intermediate' },
      { id: 2, title: 'Core Stability Flow', focus: 'Core', duration: 20, difficulty: 'beginner' },
      { id: 3, title: 'Strength Power Ladder', focus: 'Strength', duration: 35, difficulty: 'advanced' }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
