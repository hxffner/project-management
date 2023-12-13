export type Event = {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: string;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: string;
  status: string;
  subTasks: SubTask[];
};

export type SubTask = {
  id: number;
  name: string;
  desc: string;
};
