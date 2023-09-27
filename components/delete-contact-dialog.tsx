"use client";

import { Contact } from "@/app/api/contacts/route";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";

const DeleteContactDialog = ({ contact }: { contact: Contact }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={async () => {
            await fetch("/api/contacts", {
              method: "DELETE",
              body: JSON.stringify({ id: contact.id }),
            });

            setIsOpen(false);
          }}
          variant={"destructive"}
        >
          Delete Contact
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteContactDialog;
