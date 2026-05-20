export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface ActivityPromptObjective {
  taskDescription: string;
  systemTemplate: string;
  placeholderText: string;
  exampleSolution: string;
}

export interface ActivityCopyObjective {
  scenario: string;
  audience: string;
  goal: string;
  placeholderText: string;
  exampleSolution: string;
}

export type LessonActivityType = "quiz" | "prompt_sandbox" | "copy_sandbox";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  durationMin: number;
  steps: string[]; // Bite-sized readable paragraphs/teaching statements
  activityType: LessonActivityType;
  quiz?: QuizQuestion;
  promptObjective?: ActivityPromptObjective;
  copyObjective?: ActivityCopyObjective;
}

export interface Course {
  id: string;
  title: string;
  category: "ai" | "copywriting" | "freelance";
  description: string;
  iconName: string; // lucide icon name
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
  totalLessons: number;
  lessons: Lesson[];
}

export interface OnboardingQuestion {
  id: string;
  text: string;
  type: "single" | "multiple";
  options: {
    value: string;
    label: string;
    description?: string;
    icon?: string;
  }[];
}

export interface UserProgress {
  selectedPathCourseIds: string[];
  completedLessonIds: Record<string, boolean>; // lessonId -> completed
  completedCourseIds: Record<string, boolean>; // courseId -> completed
  streakCount: number;
  lastCheckInDate: string | null; // dates represent check ins
  xp: number;
  onboarded: boolean;
  onboardingAnswers: Record<string, string | string[]>;
  achievements: string[]; // achievement IDs
  fullName?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  hasPaid?: boolean;
  registrationDate?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
