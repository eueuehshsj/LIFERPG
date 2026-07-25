import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import ActionShelf from "./components/ActionShelf";
import AppModals from "./components/AppModals";
import WoodenHeader from "./components/WoodenHeader";
import TaskBoard from "./components/TaskBoard";
import DataBackupModal from "./components/DataBackupModal";
import type { BackupData, Reward, Task } from "./types";

export default function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showRemoveRewardModal, setShowRemoveRewardModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [completeMode, setCompleteMode] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
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
  const [earnedPoints, setEarnedPoints] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("liferpg_earnedPoints");
      if (stored !== null) return JSON.parse(stored) ?? 0;
      // 마이그레이션: 기존 사용자는 completedTasks 합계로 초기값을 구한다.
      const legacyCompleted =
        JSON.parse(localStorage.getItem("liferpg_completedTasks") ?? "null") ??
        [];
      return legacyCompleted.reduce(
        (sum: number, t: Task) => sum + t.reward,
        0,
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
  useEffect(() => {
    localStorage.setItem("liferpg_earnedPoints", JSON.stringify(earnedPoints));
  }, [earnedPoints]);

  const totalPoints = earnedPoints - spentPoints;

  const handleAddTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID() }]);
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
    const selectedTasks = tasks.filter((t) => selectedTaskIds.includes(t.id));
    setCompletedTasks((prev) => [...prev, ...selectedTasks]);
    setEarnedPoints(
      (prev) => prev + selectedTasks.reduce((sum, t) => sum + t.reward, 0),
    );
    setTasks((prev) => prev.filter((t) => !selectedTaskIds.includes(t.id)));
    setSelectedTaskIds([]);
    setCompleteMode(false);
  };

  const toggleSelectTask = (id: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleAddReward = (reward: Omit<Reward, "id">) => {
    setRewards((prev) => [...prev, { ...reward, id: crypto.randomUUID() }]);
  };

  const handleClaim = (reward: Reward) => {
    setSpentPoints((prev) => prev + reward.points);
  };

  const handleRemoveReward = (id: string) => {
    setRewards((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeleteCompletedTask = (id: string) => {
    setCompletedTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleExportData = () => {
    const backup: BackupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      tasks,
      completedTasks,
      rewards,
      spentPoints,
      earnedPoints,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `todoquest-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (data: BackupData) => {
    setTasks(data.tasks);
    setCompletedTasks(data.completedTasks);
    setRewards(data.rewards);
    setSpentPoints(data.spentPoints);
    setEarnedPoints(data.earnedPoints);
    setSelectedTaskIds([]);
    setConfirmDeleteId(null);
  };

  const handleResetData = () => {
    setTasks([]);
    setCompletedTasks([]);
    setRewards([]);
    setSpentPoints(0);
    setEarnedPoints(0);
    setSelectedTaskIds([]);
    setConfirmDeleteId(null);
  };

  return (
    <div className="relative size-full flex flex-col bg-linear-to-br from-stone-700 via-stone-600 to-stone-800">
      <button
        aria-label="데이터 관리"
        onClick={() => setShowDataModal(true)}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center border border-stone-600 hover:bg-stone-700 transition-colors"
        style={{ background: "rgba(28,25,23,0.6)" }}
      >
        <Settings className="w-5 h-5 text-stone-300" />
      </button>

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

      {showDataModal && (
        <DataBackupModal
          onClose={() => setShowDataModal(false)}
          onExport={handleExportData}
          onImport={handleImportData}
          onReset={handleResetData}
        />
      )}

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
