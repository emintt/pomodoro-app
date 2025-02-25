type Task = {
  id: number;
  projectId?: number;
  name: string;
  startTime: number;
  duration: number;
  completed: boolean;
};

type Project = {
  id: number;
  name: string;
};
export type {Task};