import express from 'express';
import './config/database.js';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

type User = {
  id: number;
  name: string;
  email: string;
  team: string;
  level: string;
};

type Team = {
  id: number;
  name: string;
  members: string[];
  points: number;
};

type Activity = {
  id: number;
  userId: number;
  type: 'run' | 'workout' | 'cycling' | 'swim';
  duration: number;
  points: number;
  date: string;
};

type LeaderboardEntry = {
  id: number;
  name: string;
  points: number;
  team: string;
  streak: number;
};

type Workout = {
  id: number;
  title: string;
  focus: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

const users: User[] = [
  { id: 1, name: 'Ava Thompson', email: 'ava@octofit.com', team: 'Blue Sharks', level: 'Advanced' },
  { id: 2, name: 'Noah Lee', email: 'noah@octofit.com', team: 'Red Hawks', level: 'Intermediate' },
  { id: 3, name: 'Mila Patel', email: 'mila@octofit.com', team: 'Green Falcons', level: 'Beginner' }
];

const teams: Team[] = [
  { id: 1, name: 'Blue Sharks', members: ['Ava Thompson', 'Ethan Park'], points: 1240 },
  { id: 2, name: 'Red Hawks', members: ['Noah Lee', 'Sofia Nguyen'], points: 1185 },
  { id: 3, name: 'Green Falcons', members: ['Mila Patel', 'Leo Garcia'], points: 1108 }
];

const activities: Activity[] = [
  { id: 1, userId: 1, type: 'run', duration: 32, points: 240, date: '2026-09-18' },
  { id: 2, userId: 2, type: 'workout', duration: 45, points: 300, date: '2026-09-19' },
  { id: 3, userId: 3, type: 'cycling', duration: 25, points: 210, date: '2026-09-20' }
];

const leaderboard: LeaderboardEntry[] = [
  { id: 1, name: 'Ava Thompson', points: 1240, team: 'Blue Sharks', streak: 12 },
  { id: 2, name: 'Noah Lee', points: 1185, team: 'Red Hawks', streak: 9 },
  { id: 3, name: 'Mila Patel', points: 1108, team: 'Green Falcons', streak: 7 }
];

const workouts: Workout[] = [
  { id: 1, title: 'Interval Sprint Circuit', focus: 'Cardio', duration: 25, difficulty: 'intermediate' },
  { id: 2, title: 'Core Stability Flow', focus: 'Core', duration: 20, difficulty: 'beginner' },
  { id: 3, title: 'Strength Power Ladder', focus: 'Strength', duration: 35, difficulty: 'advanced' }
];

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-api', apiBaseUrl });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl, port });
});

const getNextId = (items: Array<{ id: number }>) => (items.at(-1)?.id ?? 0) + 1;

app.get(['/api/users', '/api/users/'], async (_request, response) => {
  response.json(await UserModel.find().sort({ id: 1 }).lean());
});

app.get(['/api/users/:id', '/api/users/:id/'], async (request, response) => {
  const userId = Number(request.params.id);
  const user = await UserModel.findOne({ id: userId }).lean();

  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  response.json(user);
});

app.post(['/api/users', '/api/users/'], async (request, response) => {
  const { name, email, team, level } = request.body;

  if (!name || !email) {
    response.status(400).json({ message: 'Name and email are required' });
    return;
  }

  const lastUser = await UserModel.findOne().sort({ id: -1 }).lean();
  const newUser = {
    id: (lastUser?.id ?? 0) + 1,
    name,
    email,
    team: team ?? 'Unassigned',
    level: level ?? 'Beginner'
  };

  response.status(201).json(await UserModel.create(newUser));
});

app.get(['/api/teams', '/api/teams/'], async (_request, response) => {
  response.json(await TeamModel.find().sort({ id: 1 }).lean());
});

app.get(['/api/teams/:id', '/api/teams/:id/'], async (request, response) => {
  const teamId = Number(request.params.id);
  const team = await TeamModel.findOne({ id: teamId }).lean();

  if (!team) {
    response.status(404).json({ message: 'Team not found' });
    return;
  }

  response.json(team);
});

app.post(['/api/teams', '/api/teams/'], async (request, response) => {
  const { name, members, points } = request.body;

  if (!name) {
    response.status(400).json({ message: 'Team name is required' });
    return;
  }

  const lastTeam = await TeamModel.findOne().sort({ id: -1 }).lean();
  const newTeam = {
    id: (lastTeam?.id ?? 0) + 1,
    name,
    members: members ?? [],
    points: points ?? 0
  };

  response.status(201).json(await TeamModel.create(newTeam));
});

app.get(['/api/activities', '/api/activities/'], async (_request, response) => {
  response.json(await ActivityModel.find().sort({ id: 1 }).lean());
});

app.get(['/api/activities/:id', '/api/activities/:id/'], async (request, response) => {
  const activityId = Number(request.params.id);
  const activity = await ActivityModel.findOne({ id: activityId }).lean();

  if (!activity) {
    response.status(404).json({ message: 'Activity not found' });
    return;
  }

  response.json(activity);
});

app.post(['/api/activities', '/api/activities/'], async (request, response) => {
  const { userId, type, duration, points, date } = request.body;

  if (!userId || !type || !duration) {
    response.status(400).json({ message: 'userId, type, and duration are required' });
    return;
  }

  const lastActivity = await ActivityModel.findOne().sort({ id: -1 }).lean();
  const newActivity = {
    id: (lastActivity?.id ?? 0) + 1,
    userId: Number(userId),
    type,
    duration: Number(duration),
    points: Number(points ?? 0),
    date: date ?? new Date().toISOString().slice(0, 10)
  };

  response.status(201).json(await ActivityModel.create(newActivity));
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_request, response) => {
  response.json(await LeaderboardModel.find().sort({ id: 1 }).lean());
});

app.get(['/api/leaderboard/:id', '/api/leaderboard/:id/'], async (request, response) => {
  const entryId = Number(request.params.id);
  const entry = await LeaderboardModel.findOne({ id: entryId }).lean();

  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' });
    return;
  }

  response.json(entry);
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (request, response) => {
  const { name, points, team, streak } = request.body;

  if (!name || !points) {
    response.status(400).json({ message: 'Name and points are required' });
    return;
  }

  const lastEntry = await LeaderboardModel.findOne().sort({ id: -1 }).lean();
  const newEntry = {
    id: (lastEntry?.id ?? 0) + 1,
    name,
    points: Number(points),
    team: team ?? 'Unassigned',
    streak: Number(streak ?? 0)
  };

  response.status(201).json(await LeaderboardModel.create(newEntry));
});

app.get(['/api/workouts', '/api/workouts/'], async (_request, response) => {
  response.json(await WorkoutModel.find().sort({ id: 1 }).lean());
});

app.get(['/api/workouts/:id', '/api/workouts/:id/'], async (request, response) => {
  const workoutId = Number(request.params.id);
  const workout = await WorkoutModel.findOne({ id: workoutId }).lean();

  if (!workout) {
    response.status(404).json({ message: 'Workout not found' });
    return;
  }

  response.json(workout);
});

app.post(['/api/workouts', '/api/workouts/'], async (request, response) => {
  const { title, focus, duration, difficulty } = request.body;

  if (!title || !focus || !duration) {
    response.status(400).json({ message: 'Title, focus, and duration are required' });
    return;
  }

  const lastWorkout = await WorkoutModel.findOne().sort({ id: -1 }).lean();
  const newWorkout = {
    id: (lastWorkout?.id ?? 0) + 1,
    title,
    focus,
    duration: Number(duration),
    difficulty: difficulty ?? 'beginner'
  };

  response.status(201).json(await WorkoutModel.create(newWorkout));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

export { app };