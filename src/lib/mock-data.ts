export interface RunData {
  id: string;
  date: string;
  type: "easy" | "tempo" | "interval" | "long" | "recovery" | "race";
  distance: number;
  duration: number;
  pace: string;
  calories: number;
  heartRate: number;
  elevation: number;
  splits: { mile: number; pace: string; elevation: number }[];
  effortScore: number;
  route: { lat: number; lng: number }[];
  weather?: string;
  notes?: string;
}

export interface TrainingDay {
  id: string;
  date: string;
  dayOfWeek: string;
  type: "easy" | "tempo" | "interval" | "long" | "recovery" | "rest" | "race" | "cross";
  title: string;
  description: string;
  targetDistance?: number;
  targetPace?: string;
  completed: boolean;
  skipped: boolean;
  runData?: RunData;
}

export interface TrainingWeek {
  weekNumber: number;
  phase: string;
  totalMileage: number;
  days: TrainingDay[];
}

export interface Persona {
  title: string;
  tagline: string;
  description: string;
  traits: string[];
  strengths: string[];
  color: string;
  gradient: string;
  icon: string;
}

export interface RunClub {
  id: string;
  name: string;
  city: string;
  members: number;
  nextRun: string;
  pace: string;
  vibe: string;
  image: string;
  distance: string;
  day: string;
}

export interface Race {
  id: string;
  name: string;
  date: string;
  city: string;
  type: "5K" | "10K" | "Half Marathon" | "Marathon";
  registered: boolean;
  image: string;
  participants: number;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  weeklyMiles: number;
  streak: number;
  lastRun: string;
  runnerScore: number;
  persona: string;
}

export interface FeedItem {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  type: "run" | "achievement" | "streak" | "challenge";
  content: string;
  distance?: number;
  pace?: string;
  duration?: number;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
}

export const currentUser = {
  name: "Alex Rivera",
  avatar: "AR",
  location: "Brooklyn, NY",
  level: "intermediate" as const,
  targetRace: "Half Marathon" as const,
  raceDate: "2026-05-17",
  raceName: "Brooklyn Half Marathon",
  weeklyMileage: 28,
  bestHalf: "1:52:14",
  runnerScore: 84,
  runnerScoreChange: +3,
  streak: 8,
  persona: "The Closer" as const,
  totalRuns: 147,
  totalMiles: 1243,
  memberSince: "2025-09",
  predictedHalf: "1:47:32",
  predicted5k: "22:14",
  predicted10k: "46:38",
  predictedMarathon: "3:48:05",
  badges: [
    "Century Club", "Streak Master", "Dawn Runner",
    "Tempo King", "Marathon Trainee", "Social Runner"
  ],
  connectedDevices: ["Apple Watch", "Strava"],
  clubs: ["Brooklyn Track Club", "Morning Runners NYC"],
};

export const personas: Record<string, Persona> = {
  "The Closer": {
    title: "The Closer",
    tagline: "You finish stronger than you start.",
    description: "Closers have a signature ability to accelerate in the final miles. Your negative splits and late-race speed define your running identity.",
    traits: ["Negative splits", "Strong finishes", "Mental toughness", "Race-day clutch"],
    strengths: ["Final mile speed", "Race execution", "Mental endurance", "Competitive drive"],
    color: "#BFFF00",
    gradient: "from-[#BFFF00] to-[#00E5FF]",
    icon: "⚡",
  },
  "The Diesel": {
    title: "The Diesel",
    tagline: "You never stop running.",
    description: "Diesels are built for endurance. Your consistency and ability to hold pace mile after mile makes you unstoppable on long runs.",
    traits: ["Even pacing", "High mileage", "Endurance beast", "Unbreakable rhythm"],
    strengths: ["Long-run dominance", "Consistency", "Fatigue resistance", "Volume capacity"],
    color: "#FF6B35",
    gradient: "from-[#FF6B35] to-[#FFD700]",
    icon: "🔥",
  },
  "The Ghost": {
    title: "The Ghost",
    tagline: "Silent. Fast. Gone.",
    description: "Ghosts are the runners nobody sees coming. You train quietly, show up on race day, and surprise everyone with your performance.",
    traits: ["Stealth training", "Race-day surprise", "Low profile", "Elite potential"],
    strengths: ["Speed reserve", "Tactical racing", "Calm under pressure", "Peak performance"],
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6] to-[#06B6D4]",
    icon: "👻",
  },
  "The Grinder": {
    title: "The Grinder",
    tagline: "Every. Single. Day.",
    description: "Grinders don't miss. Your streak and consistency are legendary. Rain, snow, tired — you show up.",
    traits: ["Never misses", "All-weather runner", "Discipline machine", "Streak obsessed"],
    strengths: ["Consistency", "Mental discipline", "Habit strength", "Resilience"],
    color: "#EF4444",
    gradient: "from-[#EF4444] to-[#F97316]",
    icon: "💪",
  },
};

export const recentRuns: RunData[] = [
  {
    id: "run-1",
    date: "2026-03-20",
    type: "tempo",
    distance: 6.8,
    duration: 3180,
    pace: "7:48",
    calories: 620,
    heartRate: 162,
    elevation: 145,
    effortScore: 82,
    weather: "52°F, Clear",
    splits: [
      { mile: 1, pace: "8:05", elevation: 22 },
      { mile: 2, pace: "7:52", elevation: -8 },
      { mile: 3, pace: "7:41", elevation: 35 },
      { mile: 4, pace: "7:38", elevation: -12 },
      { mile: 5, pace: "7:35", elevation: 18 },
      { mile: 6, pace: "7:30", elevation: -15 },
    ],
    route: [],
    notes: "Fastest tempo in 5 weeks. Negative splits the whole way.",
  },
  {
    id: "run-2",
    date: "2026-03-18",
    type: "easy",
    distance: 4.2,
    duration: 2268,
    pace: "9:00",
    calories: 380,
    heartRate: 138,
    elevation: 65,
    effortScore: 45,
    weather: "48°F, Overcast",
    splits: [
      { mile: 1, pace: "9:10", elevation: 15 },
      { mile: 2, pace: "8:55", elevation: -5 },
      { mile: 3, pace: "8:58", elevation: 20 },
      { mile: 4, pace: "8:52", elevation: -10 },
    ],
    route: [],
  },
  {
    id: "run-3",
    date: "2026-03-15",
    type: "long",
    distance: 11.3,
    duration: 5763,
    pace: "8:30",
    calories: 1050,
    heartRate: 152,
    elevation: 280,
    effortScore: 78,
    weather: "55°F, Sunny",
    splits: [
      { mile: 1, pace: "8:45", elevation: 30 },
      { mile: 2, pace: "8:38", elevation: -10 },
      { mile: 3, pace: "8:32", elevation: 25 },
      { mile: 4, pace: "8:28", elevation: -5 },
      { mile: 5, pace: "8:25", elevation: 35 },
      { mile: 6, pace: "8:30", elevation: -15 },
      { mile: 7, pace: "8:22", elevation: 20 },
      { mile: 8, pace: "8:35", elevation: 40 },
      { mile: 9, pace: "8:28", elevation: -20 },
      { mile: 10, pace: "8:18", elevation: 15 },
      { mile: 11, pace: "8:10", elevation: -10 },
    ],
    route: [],
    notes: "Longest run this training cycle. Felt strong.",
  },
];

const generateWeek = (weekNum: number, phase: string): TrainingWeek => {
  const baseDate = new Date("2026-03-16");
  baseDate.setDate(baseDate.getDate() + (weekNum - 8) * 7);

  const days: TrainingDay[] = [
    {
      id: `w${weekNum}-1`, date: new Date(baseDate.getTime()).toISOString().split("T")[0],
      dayOfWeek: "Mon", type: "easy", title: "Easy Run",
      description: "Comfortable pace, focus on form", targetDistance: 4, targetPace: "9:00-9:30",
      completed: weekNum < 8, skipped: false,
    },
    {
      id: `w${weekNum}-2`, date: new Date(baseDate.getTime() + 86400000).toISOString().split("T")[0],
      dayOfWeek: "Tue", type: "interval", title: "Speed Work",
      description: "6x800m at 5K pace with 400m recovery jog", targetDistance: 5, targetPace: "7:00-7:15",
      completed: weekNum < 8, skipped: false,
    },
    {
      id: `w${weekNum}-3`, date: new Date(baseDate.getTime() + 86400000 * 2).toISOString().split("T")[0],
      dayOfWeek: "Wed", type: "recovery", title: "Recovery Run",
      description: "Very easy pace, active recovery", targetDistance: 3, targetPace: "9:30-10:00",
      completed: weekNum < 8, skipped: false,
    },
    {
      id: `w${weekNum}-4`, date: new Date(baseDate.getTime() + 86400000 * 3).toISOString().split("T")[0],
      dayOfWeek: "Thu", type: "tempo", title: "Tempo Run",
      description: "Sustained effort at half marathon pace", targetDistance: 6, targetPace: "7:45-8:00",
      completed: weekNum < 8 && weekNum > 5, skipped: false,
    },
    {
      id: `w${weekNum}-5`, date: new Date(baseDate.getTime() + 86400000 * 4).toISOString().split("T")[0],
      dayOfWeek: "Fri", type: "rest", title: "Rest Day",
      description: "Full rest or light stretching", completed: true, skipped: false,
    },
    {
      id: `w${weekNum}-6`, date: new Date(baseDate.getTime() + 86400000 * 5).toISOString().split("T")[0],
      dayOfWeek: "Sat", type: "long", title: "Long Run",
      description: "Build endurance at easy pace", targetDistance: weekNum < 10 ? 10 + weekNum : 13, targetPace: "8:30-9:00",
      completed: weekNum < 8, skipped: false,
    },
    {
      id: `w${weekNum}-7`, date: new Date(baseDate.getTime() + 86400000 * 6).toISOString().split("T")[0],
      dayOfWeek: "Sun", type: "cross", title: "Cross Training",
      description: "Yoga, cycling, or swimming", completed: weekNum < 8, skipped: false,
    },
  ];

  return {
    weekNumber: weekNum,
    phase,
    totalMileage: days.reduce((sum, d) => sum + (d.targetDistance || 0), 0),
    days,
  };
};

export const trainingPlan: TrainingWeek[] = [
  generateWeek(6, "Build"),
  generateWeek(7, "Build"),
  generateWeek(8, "Peak"),
  generateWeek(9, "Peak"),
  generateWeek(10, "Taper"),
  generateWeek(11, "Taper"),
  generateWeek(12, "Race Week"),
];

export const runClubs: RunClub[] = [
  {
    id: "club-1", name: "Brooklyn Track Club", city: "Brooklyn, NY", members: 340,
    nextRun: "Saturday, 7:00 AM", pace: "8:00-9:30/mi", vibe: "Social & Competitive",
    image: "🏃", distance: "5-8 mi", day: "Saturday",
  },
  {
    id: "club-2", name: "Morning Runners NYC", city: "Manhattan, NY", members: 520,
    nextRun: "Tue & Thu, 6:30 AM", pace: "7:30-9:00/mi", vibe: "Early Birds",
    image: "🌅", distance: "4-6 mi", day: "Tue/Thu",
  },
  {
    id: "club-3", name: "Prospect Park Pacers", city: "Brooklyn, NY", members: 180,
    nextRun: "Sunday, 8:00 AM", pace: "8:30-10:00/mi", vibe: "Beginner Friendly",
    image: "🌳", distance: "3-6 mi", day: "Sunday",
  },
  {
    id: "club-4", name: "NYC Bridge Runners", city: "Manhattan, NY", members: 290,
    nextRun: "Wednesday, 6:00 PM", pace: "7:00-8:30/mi", vibe: "After Work",
    image: "🌉", distance: "5-7 mi", day: "Wednesday",
  },
  {
    id: "club-5", name: "Williamsburg Run Crew", city: "Brooklyn, NY", members: 150,
    nextRun: "Thursday, 7:00 PM", pace: "8:00-10:00/mi", vibe: "Social & Chill",
    image: "✨", distance: "3-5 mi", day: "Thursday",
  },
];

export const races: Race[] = [
  {
    id: "race-1", name: "Brooklyn Half Marathon", date: "2026-05-17", city: "Brooklyn, NY",
    type: "Half Marathon", registered: true, image: "🏅", participants: 28000,
  },
  {
    id: "race-2", name: "NYC 10K", date: "2026-06-14", city: "Manhattan, NY",
    type: "10K", registered: false, image: "🎯", participants: 12000,
  },
  {
    id: "race-3", name: "Queens Distance 5K", date: "2026-04-12", city: "Queens, NY",
    type: "5K", registered: false, image: "🚀", participants: 3500,
  },
  {
    id: "race-4", name: "NYC Marathon", date: "2026-11-01", city: "New York, NY",
    type: "Marathon", registered: false, image: "🗽", participants: 55000,
  },
  {
    id: "race-5", name: "Central Park Loop 10K", date: "2026-04-26", city: "Manhattan, NY",
    type: "10K", registered: false, image: "🌿", participants: 8000,
  },
];

export const friends: Friend[] = [
  { id: "f-1", name: "Jordan Chen", avatar: "JC", weeklyMiles: 32, streak: 12, lastRun: "2h ago", runnerScore: 91, persona: "The Diesel" },
  { id: "f-2", name: "Maya Singh", avatar: "MS", weeklyMiles: 24, streak: 5, lastRun: "5h ago", runnerScore: 78, persona: "The Grinder" },
  { id: "f-3", name: "Sam Okafor", avatar: "SO", weeklyMiles: 18, streak: 3, lastRun: "1d ago", runnerScore: 72, persona: "The Ghost" },
  { id: "f-4", name: "Lena Park", avatar: "LP", weeklyMiles: 36, streak: 21, lastRun: "3h ago", runnerScore: 88, persona: "The Closer" },
  { id: "f-5", name: "Marcus Bell", avatar: "MB", weeklyMiles: 15, streak: 2, lastRun: "2d ago", runnerScore: 65, persona: "The Sprinter" },
];

export const feedItems: FeedItem[] = [
  {
    id: "feed-1", userId: "f-1", userName: "Jordan Chen", avatar: "JC",
    type: "run", content: "Morning tempo through Prospect Park. Feeling strong.",
    distance: 7.2, pace: "7:35", duration: 3276, timestamp: "2h ago",
    likes: 14, comments: 3, liked: false,
  },
  {
    id: "feed-2", userId: "f-4", userName: "Lena Park", avatar: "LP",
    type: "streak", content: "21 days and counting. Momentum is building.",
    timestamp: "3h ago", likes: 28, comments: 7, liked: true,
  },
  {
    id: "feed-3", userId: "f-2", userName: "Maya Singh", avatar: "MS",
    type: "run", content: "Recovery miles along the East River. Perfect weather.",
    distance: 4.0, pace: "9:12", duration: 2208, timestamp: "5h ago",
    likes: 9, comments: 1, liked: false,
  },
  {
    id: "feed-4", userId: "f-3", userName: "Sam Okafor", avatar: "SO",
    type: "achievement", content: "New 5K PR: 21:42. The training is paying off.",
    timestamp: "1d ago", likes: 42, comments: 12, liked: true,
  },
  {
    id: "feed-5", userId: "f-1", userName: "Jordan Chen", avatar: "JC",
    type: "challenge", content: "Weekend mileage challenge: who's hitting 20+ miles?",
    timestamp: "1d ago", likes: 18, comments: 8, liked: false,
  },
];

export const coachMessages = [
  "You're trending ahead of goal pace. Keep this momentum.",
  "Your long-run consistency is improving — that's where half marathon fitness is built.",
  "This week: prioritize your tempo run. It's the key workout before taper.",
  "Recovery matters. Take tomorrow's easy run truly easy.",
  "You missed your last recovery run. Let's rebalance this week.",
];

export const runnerScoreBreakdown = {
  consistency: { score: 92, label: "Consistency", change: +2, description: "8-day streak, 95% plan completion" },
  paceImprovement: { score: 85, label: "Pace Trend", change: +5, description: "Tempo pace improved 12s/mi this month" },
  volume: { score: 78, label: "Weekly Volume", change: +1, description: "28 mi/week — on target for peak week" },
  recovery: { score: 80, label: "Recovery", change: -2, description: "Slightly under-recovered after long run" },
  raceReadiness: { score: 86, label: "Race Readiness", change: +4, description: "On track for 1:47 half marathon" },
};

export const weeklyStats = [
  { week: "W1", miles: 22, score: 72 },
  { week: "W2", miles: 25, score: 75 },
  { week: "W3", miles: 24, score: 74 },
  { week: "W4", miles: 28, score: 79 },
  { week: "W5", miles: 26, score: 78 },
  { week: "W6", miles: 30, score: 82 },
  { week: "W7", miles: 28, score: 81 },
  { week: "W8", miles: 32, score: 84 },
];

export const predictionHistory = [
  { week: "W1", time: 115, label: "1:55" },
  { week: "W2", time: 113, label: "1:53" },
  { week: "W3", time: 112, label: "1:52" },
  { week: "W4", time: 111, label: "1:51" },
  { week: "W5", time: 110, label: "1:50" },
  { week: "W6", time: 109, label: "1:49" },
  { week: "W7", time: 108, label: "1:48" },
  { week: "W8", time: 107.5, label: "1:47:32" },
];

export function getDaysUntilRace(): number {
  const race = new Date(currentUser.raceDate);
  const now = new Date("2026-03-20");
  return Math.ceil((race.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
