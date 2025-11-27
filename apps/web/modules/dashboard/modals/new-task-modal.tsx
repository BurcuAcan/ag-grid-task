"use client";

import { useState } from "react";
import { Task } from "../types/task";

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("formData",formData);
    // Reset form
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
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl bg-white shadow-2xl">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              ➕ Yeni Görev Oluştur
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Görev Adı *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none"
                  placeholder="Görev adını girin..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none"
                  placeholder="Görev açıklaması..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Durum *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Task["status"] })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Öncelik *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task["priority"] })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Atanan Kişi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none"
                    placeholder="İsim girin..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Proje *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none"
                    placeholder="Proje adı..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Teslim Tarihi *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Tahmini Süre (saat) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.estimateHours}
                    onChange={(e) => setFormData({ ...formData, estimateHours: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Görev Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
