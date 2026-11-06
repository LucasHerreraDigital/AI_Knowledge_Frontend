import { useEffect, useState } from "react";
import { LoaderCircle, X } from "lucide-react";

interface RenameWorkspaceModalProps{
    open: boolean;
    currentTitle:string;
    loading?: boolean;
    onClose: () => void;
    onRename: (title:string) => void;
}

