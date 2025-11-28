"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmDialogProps {
  selectedCount: number;
  onConfirm: () => void;
  disabled?: boolean;
}

export function DeleteConfirmDialog({
  selectedCount,
  onConfirm,
  disabled,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={disabled} className="rounded-full">
          <Trash2 className="h-4 w-4" />
          Seçili Görevleri Sil
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>🗑️ Görevleri Silmek İstiyor musunuz?</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedCount > 0 ? (
              <>
                <span className="font-semibold text-slate-900">{selectedCount} adet</span> görevi
                silmek üzeresiniz. Bu işlem geri alınamaz.
              </>
            ) : (
              "Lütfen silmek için en az bir görev seçin."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          {selectedCount > 0 && (
            <AlertDialogAction
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Sil
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
