import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

interface ResizableComponentProps {
    defaultLayout?: number[] | undefined;
    left: React.ReactNode;
    right: React.ReactNode;
    showLeftPanel: boolean;
}

const ResizableComponent = ({ defaultLayout, left, right, showLeftPanel }: ResizableComponentProps) => {
    const onLayout = (sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
    };

    return (
        <div className="h-screen w-full overflow-hidden">
            <PanelGroup 
                autoSaveId="conditional" 
                direction="horizontal" 
                onLayout={onLayout}
                className="h-full"
            >
                {showLeftPanel && (
                    <>
                        <Panel 
                            collapsible 
                            defaultSize={defaultLayout ? defaultLayout[0] : 50} 
                            minSize={15}
                            className="h-full"
                        >
                            <div className="h-full">
                                {left}
                            </div>
                        </Panel>
                        <PanelResizeHandle className="w-1 bg-[#9b9b9bda] hover:bg-blue-500 transition-colors" />
                    </>
                )}
                <Panel 
                    defaultSize={defaultLayout ? defaultLayout[1] : 50}
                    className="h-full"
                >
                    <div className="h-full">
                        {right}
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default ResizableComponent;