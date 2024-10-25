import { useState } from "react"
import { IFile } from "../interface"
import Down from "./SVG/Down"
import Right from "./SVG/Right"
import FileIconRender from "./FileIconRender"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import {  setOpenedFiles, setSelectedFile } from "../app/features/fileTreeSlice"
import { checkFileObjectExist } from "../utils/functions"
import { useCallback } from "react"

interface IProps {
  fileTree: IFile
}

export const RecursiveComponent = ({fileTree}: IProps) => {
  const { id, name, isFolder, children, content } = fileTree
  // REDUX HOOKS
  const dispatch = useDispatch()
  const openedFiles = useSelector((state: RootState) => state.fileTree.openedFiles)

  // STATE
  const [isOpen, setIsOpen] = useState<boolean>(false)


  // HANDLERS

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const openFile = useCallback(() => {
    const exist = checkFileObjectExist(openedFiles, id)
    if (exist) {
      dispatch(setSelectedFile({ filename: name, content: content, activeId: id }))
      return
    }
    dispatch(setOpenedFiles([...openedFiles, fileTree]))
    dispatch(setSelectedFile({ filename: name, content: content, activeId: id }))
  }, [openedFiles, id, name, content, fileTree, dispatch])
    return (
      <div className="ml-3 mt-2 cursor-pointer">
        <div className="flex items-center mb-2" >
          
            {
              isFolder ? (
                <div className="flex items-center space-x-1" onClick={handleToggle}>
                  <div className="flex items-center space-x-1">
                    {isOpen ? (
                      <Down />
                    ) : (
                      <Right /> 
                    )}
                    
                    <FileIconRender name={name} />
                  </div>

                  <span>{name}</span>
                </div>
                
              ) : 
              <div className="flex items-center" onClick={openFile}>
                <FileIconRender name={name} />

                <span>{name}</span>
              </div>
            }
          

        </div>
        {children && isOpen && children.map(child => (
          <RecursiveComponent key={child.name} fileTree={child} />
        ))}

      </div>
    )
  }