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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showRemoveRewardModal, setShowRemoveRewardModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [completeMode, setCompleteMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [spentPoints, setSpentPoints] = useState(0);

  const earnedPoints = completedTasks.reduce((sum, t) => sum + t.reward, 0);
  const totalPoints = earnedPoints - spentPoints;

  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-stone-700 via-stone-600 to-stone-800">
    </div>
  );
}
