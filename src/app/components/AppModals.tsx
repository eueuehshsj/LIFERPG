import AddTaskModal from "./AddTaskModal";
import AddRewardModal from "./AddRewardModal";
import RewardClaimModal from "./RewardClaimModal";
import CompletedTasksModal from "./CompletedTasksModal";
import RemoveRewardModal from "./RemoveRewardModal";
import type { Reward, Task } from "../types";

interface AppModalsProps {
  showAddModal: boolean;
  showAddRewardModal: boolean;
  showClaimModal: boolean;
  showRemoveRewardModal: boolean;
  showCompletedModal: boolean;
  editingTask: Task | null;
  rewards: Reward[];
  completedTasks: Task[];
  totalPoints: number;
  onCloseAddModal: () => void;
  onSubmitAddTask: (task: Omit<Task, "id">) => void;
  onCloseAddRewardModal: () => void;
  onSubmitAddReward: (reward: Omit<Reward, "id">) => void;
  onCloseClaimModal: () => void;
  onClaimReward: (reward: Reward) => void;
  onCloseRemoveRewardModal: () => void;
  onRemoveReward: (id: number) => void;
  onCloseCompletedModal: () => void;
  onDeleteCompletedTask: (id: number) => void;
}

export default function AppModals({
  showAddModal,
  showAddRewardModal,
  showClaimModal,
  showRemoveRewardModal,
  showCompletedModal,
  editingTask,
  rewards,
  completedTasks,
  totalPoints,
  onCloseAddModal,
  onSubmitAddTask,
  onCloseAddRewardModal,
  onSubmitAddReward,
  onCloseClaimModal,
  onClaimReward,
  onCloseRemoveRewardModal,
  onRemoveReward,
  onCloseCompletedModal,
  onDeleteCompletedTask,
}: AppModalsProps) {
  return (
    <>
      {showRemoveRewardModal && (
        <RemoveRewardModal
          onClose={onCloseRemoveRewardModal}
          onRemove={onRemoveReward}
          rewards={rewards}
        />
      )}

      {showCompletedModal && (
        <CompletedTasksModal
          onClose={onCloseCompletedModal}
          completedTasks={completedTasks}
          onDeleteTask={onDeleteCompletedTask}
        />
      )}

      {showClaimModal && (
        <RewardClaimModal
          onClose={onCloseClaimModal}
          onClaim={(reward) => {
            onClaimReward(reward);
            onCloseClaimModal();
          }}
          rewards={rewards}
          currentPoints={totalPoints}
        />
      )}

      {showAddRewardModal && (
        <AddRewardModal
          onClose={onCloseAddRewardModal}
          onSubmit={(reward) => {
            onSubmitAddReward(reward);
            onCloseAddRewardModal();
          }}
        />
      )}

      {(showAddModal || editingTask) && (
        <AddTaskModal
          onClose={onCloseAddModal}
          onSubmit={(task) => {
            onSubmitAddTask(task);
            onCloseAddModal();
          }}
          editingTask={editingTask}
        />
      )}
    </>
  );
}
