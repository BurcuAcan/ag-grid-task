"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { Label } from "@repo/ui/components/label";
import { Button } from "@repo/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Task } from "../../types/task";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
}

export function NewTaskModal({ isOpen, onClose, onSubmit }: NewTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo" as Task["status"],
    priority: "Medium" as Task["priority"],
    assignedTo: "",
    project: "",
    dueDate: "",
    estimateHours: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("formData", formData);
    setFormData({
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      assignedTo: "",
      project: "",
      dueDate: "",
      estimateHours: 0,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>➕ Yeni Görev Oluştur</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Görev Adı *</Label>
            <Input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Görev adını girin..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              placeholder="Görev açıklaması..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Durum *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as Task["status"] })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todo">Todo</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Öncelik *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value as Task["priority"] })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Öncelik seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Atanan Kişi *</Label>
              <Input
                id="assignedTo"
                type="text"
                required
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
                placeholder="İsim girin..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Proje *</Label>
              <Input
                id="project"
                type="text"
                required
                value={formData.project}
                onChange={(e) =>
                  setFormData({ ...formData, project: e.target.value })
                }
                placeholder="Proje adı..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Teslim Tarihi *</Label>
              <Input
                id="dueDate"
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimateHours">Tahmini Süre (saat) *</Label>
              <Input
                id="estimateHours"
                type="number"
                required
                min="0"
                value={formData.estimateHours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimateHours: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit">Görev Oluştur</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
