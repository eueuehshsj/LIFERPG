export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  reward: number;
  author: string;
}

export interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
}
