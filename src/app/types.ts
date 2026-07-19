export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  reward: number;
  author: string;
}

export interface Reward {
  id: string;
  name: string;
  points: number;
  description: string;
}
