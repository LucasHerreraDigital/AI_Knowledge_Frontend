import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

interface DocumentActionsProps {
  onView?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

const DocumentActions = ({
  onView,
  onDownload,
  onDelete,
}: DocumentActionsProps) => {
  const [open, setOpen] = useState(false);
  const documentActionRef = useRef<HTMLDivElement>(null)
  
  useEffect(()=>{
    if(!open)return
    
    const handleClickOutside = (event:MouseEvent)=>{
      if(documentActionRef.current && !documentActionRef.current.contains(event.target as Node)){
        setOpen(false)
      }
    }
    const handleEscape = (event:KeyboardEvent) =>{
      if(event.key==="Escape"){
        setOpen(false)
      }
    }

    document.addEventListener("mousedown",handleClickOutside)
    document.addEventListener("keydown",handleEscape)

    return()=>{
      document.removeEventListener("mousedown",handleClickOutside)
      document.removeEventListener("keydown",handleEscape)
    }
  },[open])


  return (
    <div className="relative" ref={documentActionRef} >
      <button
        type="button"
        aria-label="Abrir acciones del documento"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="cursor-pointer rounded-lg p-2 text-text-secondary transition-colors hover:bg-background hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <MoreVertical size={18}/>
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-20 w-44 overflow-hidden rounded-lg border border-border bg-surface shadow-xl">

          <button
            onClick={() => {
              onView?.();
              setOpen(false);
            }} 
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-text-primary transition-colors hover:bg-background cursor-pointer hover:bg-indigo-600/15"
          >
            <Eye size={16} />
            Ver documento
          </button>

          <button
            onClick={() => {
              onDownload?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-text-primary transition-colors hover:bg-background cursor-pointer hover:bg-indigo-600/15"
          >
            <Download size={16} />
            Descargar
          </button>

          <div className="border-t border-border" />

          <button
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-500/20 cursor-pointer"
          >
            <Trash2 size={16} />
            Eliminar
          </button>

        </div>
      )}
    </div>
  );
};

export default DocumentActions;