import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  reward: number;
  author: string;
}

interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
}

export default function App() {
  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-stone-700 via-stone-600 to-stone-800">
    </div>
  );
}
