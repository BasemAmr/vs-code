import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice } from "@reduxjs/toolkit";
import { IFile } from "../../interface";


interface ISelectedFile {
    filename: string;
    content: string | undefined;
    activeId: string;
}

interface IInitialState {
    openedFiles: IFile[];
    selectedFile: ISelectedFile;
}

const initialState :IInitialState = {
    openedFiles: [],
    selectedFile: {
        filename: "",
        content: "",
        activeId: ""
    },

}

const fileTreeSlice = createSlice({
    name: "fileTree",
    initialState,
    reducers: {
        setOpenedFiles: (state, action:PayloadAction<IFile[]>) => {
            state.openedFiles = action.payload
        },
        setSelectedFile: (state, action:PayloadAction<ISelectedFile>) => {   
            state.selectedFile.filename = action.payload.filename
            state.selectedFile.content = action.payload.content
            state.selectedFile.activeId = action.payload.activeId
        },
    }
})

export const { setOpenedFiles, setSelectedFile } = fileTreeSlice.actions

export default fileTreeSlice
    