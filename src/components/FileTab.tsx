import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interface";
import FileIconRender from "./FileIconRender";
import CloseIcons from "./SVG/CloseIcons";
import { setOpenedFiles, setSelectedFile } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { useState, useCallback, useEffect } from "react";
import PropMenu from "./UI/PropMenu";

interface FileTabProps {
    file: IFile;
}

const FileTab = ({ file }: FileTabProps) => {
    const dispatch = useDispatch();
    const openedFiles = useSelector((state: RootState) => state.fileTree.openedFiles);
    const selectedFile = useSelector((state: RootState) => state.fileTree.selectedFile);
    
    const [contextMenu, setContextMenu] = useState<{
        isOpen: boolean;
        position: { x: number; y: number };
    }>({
        isOpen: false,
        position: { x: 0, y: 0 }
    });

    const handleClick = useCallback(() => {
        const { name, content, id } = file;
        dispatch(setSelectedFile({ filename: name, content, activeId: id }));
    }, [file, dispatch]);

    const handleClose = useCallback((id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        
        const filtered = openedFiles.filter((file) => file.id !== id);
        
        if (filtered.length === 0) {
            dispatch(setSelectedFile({ filename: '', content: '', activeId: '' }));
            dispatch(setOpenedFiles([]));
            return;
        }

        dispatch(setOpenedFiles(filtered));
        
        if (selectedFile.activeId === id) {
            const newActiveFile = filtered[filtered.length - 1];
            dispatch(setSelectedFile({
                filename: newActiveFile.name,
                content: newActiveFile.content,
                activeId: newActiveFile.id
            }));
        }
    }, [openedFiles, selectedFile.activeId, dispatch]);

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            isOpen: true,
            position: { x: e.clientX, y: e.clientY }
        });
    }, []);

    const closeContextMenu = useCallback(() => {
        setContextMenu(prev => ({ ...prev, isOpen: false }));
    }, []);

    const handleCloseAll = useCallback(() => {
        dispatch(setOpenedFiles([]));
        dispatch(setSelectedFile({ filename: '', content: '', activeId: '' }));
        closeContextMenu();
    }, [dispatch, closeContextMenu]);

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            // Close context menu if clicking outside
            if (contextMenu.isOpen) {
                const contextMenuElement = document.querySelector('.context-menu');
                const isClickInsideMenu = contextMenuElement?.contains(e.target as Node);
                
                if (!isClickInsideMenu) {
                    closeContextMenu();
                }
            }
        };

        const handleGlobalContextMenu = (e: MouseEvent) => {
            // Close existing context menu if right-clicking outside the file tab
            const fileTabElement = document.querySelector(`[data-file-id="${file.id}"]`);
            const isClickInsideTab = fileTabElement?.contains(e.target as Node);
            
            if (!isClickInsideTab && contextMenu.isOpen) {
                closeContextMenu();
            }
        };

        window.addEventListener('click', handleGlobalClick);
        window.addEventListener('contextmenu', handleGlobalContextMenu);

        return () => {
            window.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('contextmenu', handleGlobalContextMenu);
        };
    }, [contextMenu.isOpen, file.id, closeContextMenu]);

    return (
        <>
            <div 
                data-file-id={file.id}
                className={`flex items-center m-3 px-3 py-1 select-none cursor-pointer
                    ${selectedFile.activeId === file.id ? 'bg-[#282c34] text-white' : 'hover:bg-[#282c34] hover:text-white'}`}
                onClick={handleClick}
                onContextMenu={handleContextMenu}
            >
                <div className="flex items-center space-x-2 flex-1">
                    <FileIconRender name={file.name} />
                    <span >{file.name}</span>
                </div>
                
                <div 
                    className="ml-2 p-1 hover:bg-gray-600 rounded-sm opacity-60 hover:opacity-100"
                    onClick={(e) => handleClose(file.id, e)}
                >
                    <CloseIcons />
                </div>
            </div>

            {contextMenu.isOpen && (
                <PropMenu 
                    positions={contextMenu.position}
                    onClose={closeContextMenu}
                    onCloseTab={() => {
                        handleClose(file.id);
                        closeContextMenu();
                    }}
                    onCloseAll={handleCloseAll}
                />
            )}
        </>
    );
};

export default FileTab;