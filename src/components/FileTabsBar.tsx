import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import FileTab from "./FileTab";
import HighlightedSyntax from "./HighlightedSyntax";
import WelcomeTab from "./WelcomeTab";

export const FileTabsBar = () => {
    const { openedFiles, selectedFile } = useSelector((state: RootState) => state.fileTree);

    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div className="flex items-center overflow-x-auto scrollbar-thin [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
                    {openedFiles.map((file) => (
                        <div key={file.id} className={`flex items-start w-min border-r border-l border-[#303030]
                            ${selectedFile.activeId === file.id ? "border-b-4 border-[#386a91d8]" : "border-b-4 border-transparent"}
                            `}>
                            <FileTab file={file} />
                        </div>
                    ))}
                </div>

                {selectedFile.filename != "" ? (
                    <div className="p-2">
                        <HighlightedSyntax codeString={String(selectedFile.content)} />
                    </div>
                ) : (
                    <WelcomeTab />
                )}
            </div>
        </>
    );
};

export {};
