import { useEffect, useState } from "react";
import ActionShelf from "./components/ActionShelf";
import AppModals from "./components/AppModals";
import WoodenHeader from "./components/WoodenHeader";
import TaskBoard from "./components/TaskBoard";
import type { Reward, Task } from "./types";

export default function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showRemoveRewardModal, setShowRemoveRewardModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [completeMode, setCompleteMode] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("liferpg_tasks") ?? "null") ?? [];
    } catch {
      return [];
    }
  });
  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("liferpg_completedTasks") ?? "null") ??
        []
      );
    } catch {
      return [];
    }
  });
  const [rewards, setRewards] = useState<Reward[]>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("liferpg_rewards") ?? "null") ?? []
      );
    } catch {
      return [];
    }
  });
  const [spentPoints, setSpentPoints] = useState<number>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("liferpg_spentPoints") ?? "null") ?? 0
      );
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem("liferpg_tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem(
      "liferpg_completedTasks",
      JSON.stringify(completedTasks),
    );
  }, [completedTasks]);
  useEffect(() => {
    localStorage.setItem("liferpg_rewards", JSON.stringify(rewards));
  }, [rewards]);
  useEffect(() => {
    localStorage.setItem("liferpg_spentPoints", JSON.stringify(spentPoints));
  }, [spentPoints]);

  const earnedPoints = completedTasks.reduce((sum, t) => sum + t.reward, 0);
  const totalPoints = earnedPoints - spentPoints;

  const handleAddTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };

  const handleEditTask = (task: Task, updated: Omit<Task, "id">) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...updated, id: task.id } : t)),
    );
    setEditingTask(null);
    setEditMode(false);
  };

  const handleCompleteSelected = () => {
    if (selectedTaskIds.length === 0) return;
    setCompletedTasks((prev) => [
      ...prev,
      ...tasks.filter((t) => selectedTaskIds.includes(t.id)),
    ]);
    setTasks((prev) => prev.filter((t) => !selectedTaskIds.includes(t.id)));
    setSelectedTaskIds([]);
    setCompleteMode(false);
  };

  const toggleSelectTask = (id: number) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleAddReward = (reward: Omit<Reward, "id">) => {
    setRewards((prev) => [...prev, { ...reward, id: Date.now() }]);
  };

  const handleClaim = (reward: Reward) => {
    setSpentPoints((prev) => prev + reward.points);
  };

  const handleRemoveReward = (id: number) => {
    setRewards((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeleteCompletedTask = (id: number) => {
    setCompletedTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="size-full flex flex-col bg-linear-to-br from-stone-700 via-stone-600 to-stone-800">
      <WoodenHeader />
      <TaskBoard
        tasks={tasks}
        completeMode={completeMode}
        deleteMode={deleteMode}
        editMode={editMode}
        selectedTaskIds={selectedTaskIds}
        confirmDeleteId={confirmDeleteId}
        onToggleSelectTask={toggleSelectTask}
        onConfirmDeleteTask={(id) => setConfirmDeleteId(id)}
        onCancelDelete={() => setConfirmDeleteId(null)}
        onDeleteTask={(id) => {
          setTasks((prev) => prev.filter((t) => t.id !== id));
          setConfirmDeleteId(null);
          setDeleteMode(false);
        }}
        onStartEditTask={(task) => setEditingTask(task)}
      />

      <AppModals
        showAddModal={showAddModal}
        showAddRewardModal={showAddRewardModal}
        showClaimModal={showClaimModal}
        showRemoveRewardModal={showRemoveRewardModal}
        showCompletedModal={showCompletedModal}
        editingTask={editingTask}
        rewards={rewards}
        completedTasks={completedTasks}
        totalPoints={totalPoints}
        onCloseAddModal={() => {
          setShowAddModal(false);
          setEditingTask(null);
          setEditMode(false);
        }}
        onSubmitAddTask={(task) => {
          if (editingTask) handleEditTask(editingTask, task);
          else handleAddTask(task);
        }}
        onCloseAddRewardModal={() => setShowAddRewardModal(false)}
        onSubmitAddReward={(reward) => {
          handleAddReward(reward);
          setShowAddRewardModal(false);
        }}
        onCloseClaimModal={() => setShowClaimModal(false)}
        onClaimReward={(reward) => {
          handleClaim(reward);
          setShowClaimModal(false);
        }}
        onCloseRemoveRewardModal={() => setShowRemoveRewardModal(false)}
        onRemoveReward={handleRemoveReward}
        onCloseCompletedModal={() => setShowCompletedModal(false)}
        onDeleteCompletedTask={handleDeleteCompletedTask}
      />

      <ActionShelf
        onOpenAddTask={() => setShowAddModal(true)}
        onToggleDeleteMode={() => {
          setDeleteMode((v) => !v);
          setConfirmDeleteId(null);
          setCompleteMode(false);
          setEditMode(false);
        }}
        onToggleEditMode={() => {
          setEditMode((v) => !v);
          setCompleteMode(false);
          setDeleteMode(false);
          setConfirmDeleteId(null);
        }}
        onOpenAddReward={() => setShowAddRewardModal(true)}
        onOpenRemoveReward={() => setShowRemoveRewardModal(true)}
        onOpenClaimReward={() => setShowClaimModal(true)}
        onOpenCompletedTasks={() => setShowCompletedModal(true)}
        onCompleteSelected={() => {
          if (completeMode && selectedTaskIds.length > 0) {
            handleCompleteSelected();
          } else {
            setCompleteMode((v) => {
              if (v) setSelectedTaskIds([]);
              return !v;
            });
            setDeleteMode(false);
            setConfirmDeleteId(null);
            setEditMode(false);
          }
        }}
        completeMode={completeMode}
        selectedTaskIds={selectedTaskIds}
        totalPoints={totalPoints}
      />
    </div>
  );
}
