import {
  Delete,
  Download,
  Eye,
  Loader2,
  MoreVertical,
  Notebook,
  Pen,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";

const ResumeCardItem = ({ resume, refreshData }) => {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast("Resume Deleted");
        refreshData();
        setOpenAlert(false);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast("Kuch toh gadbad h / Something went wrong");
      }
    );
  };

  return (
    <div>
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="p-14 bg-secondary flex items-center justify-center h-[280px]
      border-b-3 border-b-transparent hover:scale-105 hover:border-b-blue-700 
      transition-all rounded-lg "
        >
          <Notebook />
        </div>
      </Link>
      <div className="border my-2 p-3 flex justify-between rounded-lg">
        <h2 className="text-center my-1">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigation("/dashboard/resume/" + resume.documentId + "/edit");
              }}
            >
              <Pen /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigation("/my-resume/" + resume.documentId + "/view");
              }}
            >
              <Eye /> View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigation("/my-resume/" + resume.documentId + "/view");
              }}
            >
              <Download /> Download
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => setOpenAlert(true)}
            >
              <Trash className="text-red-600" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400"
                onClick={onDelete}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeCardItem;
