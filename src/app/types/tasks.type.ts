type Session = {
  date: Date;
  duration: number;
};

type Task = {
  $loki?: number;
  projectId?: number;
  name: string;
  startTime: number;
  completed: boolean;
  totalTimeSpent?: number; // in milliseconds
  pomodorosCompleted?: number; 
  workSessions?: Session[];
};

type Project = {
  id: number;
  name: string;
};
export type {Task, Session};