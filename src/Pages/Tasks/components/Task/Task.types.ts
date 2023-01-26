export type ITask = {
  id?: number;
  completed: boolean;
  important: boolean;
  task: string;
};

export type ITaskProps = {
  id?: number;
  completed: boolean;
  important: boolean;
  task: string;
  onDelete: Function;
};
