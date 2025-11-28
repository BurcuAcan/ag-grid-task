import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Task } from "../../types/task";
import { TaskDetailPanel } from "../task-detail-panel";

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Görev Detayı</DialogTitle>
        </DialogHeader>
        <TaskDetailPanel task={task} />
      </DialogContent>
    </Dialog>
  );
}
