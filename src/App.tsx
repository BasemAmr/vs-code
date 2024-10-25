import { FileTabsBar } from "./components/FileTabsBar";
import { fileTree } from "./components/fileTree";
import { RecursiveComponent } from "./components/RecursiveComponent";
import ResizableComponent from "./components/ResizableComponent";

const leftPanel = (
    <div className="h-full w-full bg-[#20252c] flex -space-y-5">
        <RecursiveComponent fileTree={fileTree} />
    </div>
);

const rightPanel = (
    <div className="h-full w-full bg-[#282c34]">
        <FileTabsBar />
    </div>
);

function App() {
    return (
        <div className="h-screen w-full overflow-hidden">
            <ResizableComponent 
                defaultLayout={[25, 75]} 
                left={leftPanel}
                right={rightPanel}
                showLeftPanel={true}
            />
        </div>
    );
}

export default App;