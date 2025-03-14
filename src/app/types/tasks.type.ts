type Task = {
  $loki?: number;
  projectId?: number;
  name: string;
  startTime: number;
  completed: boolean;
  totalTimeSpent?: number; // in milliseconds
  pomodorosCompleted?: number; 
};

type Project = {
  id: number;
  name: string;
};
export type {Task};