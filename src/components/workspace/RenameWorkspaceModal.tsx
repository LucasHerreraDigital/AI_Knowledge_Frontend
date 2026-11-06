import { useEffect, useState } from "react";
import { LoaderCircle, X } from "lucide-react";

interface RenameWorkspaceModalProps{
    open: boolean;
    currentTitle:string;
    loading?: boolean;
    onClose: () => void;
    onRename: (title:string) => void;
}

const RenameWorkspaceModal = ({
    open,
    currentTitle,
    loading=false,
    onClose,
    onRename,
}: RenameWorkspaceModalProps) =>{
    const [title, setTitle] = useState(currentTitle);

    useEffect(()=>{
        if(open){
            setTitle(currentTitle)
        }
    },[open,currentTitle])

    if(!open) return null;

    const handleSubmit = (event: React.FormEvent)=>{
        event.preventDefault()
        const trimmedTitle = title.trim()
        if(!trimmedTitle) return
        onRename(trimmedTitle)
    }

    return(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0B1120] shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
                    <h2 className="font-semibold text-white">Renombrar workspace</h2>
                    <button type="button" disabled={loading} onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
                        <X size={18}/>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label className="mb-2 block text-sm text-slate-400">
                            Nombre del workspace
                        </label>
                        <input autoFocus value={title} onChange={(event)=>setTitle(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"/>
                    </div>
                    <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">
                        <button type="button" disabled={loading} onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading || !title.trim()} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50">
                            {loading && <LoaderCircle size={16} className="animate-spin"/>}
                            Guardar
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default RenameWorkspaceModal