import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import DataForm from "./data-form";

const AddDataDialog = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Add A Pet</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Some Pet Data</AlertDialogTitle>
            <DataForm />
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddDataDialog;
