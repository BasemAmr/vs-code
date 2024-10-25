import { IFile } from "../interface"

export const checkFileObjectExist = (arr: IFile[], id:string) => {
    return arr.some(file => file.id === id)
}