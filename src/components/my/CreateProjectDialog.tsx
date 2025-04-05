// components/CreateDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateProjectDialogProps {
  visible: boolean;
  onHide: () => void;
  header: string;
  children: React.ReactNode;
}

export default function CreateProjectDialog({
  visible,
  onHide,
  header,
  children,
}: CreateProjectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    // <Dialog
    //   visible={visible}
    //   onHide={onHide}
    //   modal
    //   header={header}
    //   className="bg-white"
    //   style={{ width: '25rem' }}
    // >
    //   {children}
    // </Dialog>
  );
}
