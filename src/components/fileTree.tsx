import { v4 as uuid } from 'uuid';
import { IFile } from "../interface";

export const fileTree: IFile = {
    id: uuid(),
    name: "src",
    isFolder: true,
    children: [
        {
            id: uuid(),
            name: "assets",
            isFolder: true,
            children: [
                {
                    id: uuid(),
                    name: "icon.svg",
                    isFolder: false,
                    content:
 `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
    <polyline points="13 2 13 9 20 9"/>
</svg>`,
                    children: []
                }
            ]
        },
        {
            id: uuid(),
            name: ".vite",
            isFolder: true,
            children: [
                {
                    id: uuid(),
                    name: ".js",
                    isFolder: false,
                    content:
 `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src'
        }
    }
})`,
                    children: []
                }
            ]
        },
        {
            id: uuid(),
            name: "components",
            isFolder: true,
            children: [
                {
                    id: uuid(),
                    name: "SVG",
                    isFolder: true,
                    children: [
                        {
                            id: uuid(),
                            name: "Down.tsx",
                            isFolder: false,
                            content:
`import React from 'react';

const Down: React.FC = () => (
    <svg 
        width="12" 
        height="12" 
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export default Down;`,
                            children: []
                        },
                        {
                            id: uuid(),
                            name: "FileIcon.tsx",
                            isFolder: false,
                            content:

`import React from 'react';

const FileIcon: React.FC = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 1.5C3 0.67157 3.67157 0 4.5 0H9.5L13 3.5V14.5C13 15.3284 12.3284 16 11.5 16H4.5C3.67157 16 3 15.3284 3 14.5V1.5Z"
            fill="#90A4AE"
        />
    </svg>
);

export default FileIcon;`,
                            children: []
                        },
                        {
                            id: uuid(),
                            name: "FolderIcon.tsx",
                            isFolder: false,
                            content:
`import React from 'react';

const FolderIcon: React.FC = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.5 2C1.5 1.17157 2.17157 0.5 3 0.5H6.5L8 2H13C13.8284 2 14.5 2.67157 14.5 3.5V13.5C14.5 14.3284 13.8284 15 13 15H3C2.17157 15 1.5 14.3284 1.5 13.5V2Z"
            fill="#FFA726"
        />
    </svg>
);

export default FolderIcon;`,
                            children: []
                        },
                        {
                            id: uuid(),
                            name: "Right.tsx",
                            isFolder: false,
content:
`import React from 'react';

const Right: React.FC = () => (
    <svg 
        width="12" 
        height="12" 
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4 2L8 6L4 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export default Right;`,
                            children: []
                        }
                    ]
                },
                {
                    id: uuid(),
                    name: "FileIconRender.tsx",
                    isFolder: false,
                    content:
`import React from 'react';
import FileIcon from './SVG/FileIcon';
import FolderIcon from './SVG/FolderIcon';

interface FileIconRenderProps {
    isFolder: boolean;
}

const FileIconRender: React.FC<FileIconRenderProps> = ({ isFolder }) => {
    return isFolder ? <FolderIcon /> : <FileIcon />;
};

export default FileIconRender;`,
                    children: []
                },
                {
                    id: uuid(),
                    name: "IconImg.tsx",
                    isFolder: false,
                    content:
`import React from 'react';
import Down from './SVG/Down';
import Right from './SVG/Right';

interface IconImgProps {
    isOpen: boolean;
    onClick: () => void;
}

const IconImg: React.FC<IconImgProps> = ({ isOpen, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="cursor-pointer hover:bg-gray-100 rounded p-1"
        >
            {isOpen ? <Down /> : <Right />}
        </div>
    );
};

export default IconImg;`,
                    children: []
                },
                {
                    id: uuid(),
                    name: "RecursiveComponent.tsx",
                    isFolder: false,
                    content:
`import React, { useState } from 'react';
import { IFile } from '../interface';
import FileIconRender from './FileIconRender';
import IconImg from './IconImg';

interface RecursiveComponentProps {
    data: IFile;
    depth: number;
}

const RecursiveComponent: React.FC<RecursiveComponentProps> = ({ data, depth }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={{ marginLeft: \`\${depth * 20}px\` }}>
            <div className="flex items-center gap-2 py-1">
                {data.isFolder && (
                    <IconImg isOpen={isOpen} onClick={toggleOpen} />
                )}
                <FileIconRender isFolder={data.isFolder} />
                <span>{data.name}</span>
            </div>
            
            {isOpen && data.children.map((child) => (
                <RecursiveComponent
                    key={child.id}
                    data={child}
                    depth={depth + 1}
                />
            ))}
        </div>
    );
};

export default RecursiveComponent;`,
                    children: []
                }
            ]
        },
        {
            id: uuid(),
            name: "interface",
            isFolder: true,
            children: [
                {
                    id: uuid(),
                    name: "index.ts",
                    isFolder: false,
                    content:
`export interface IFile {
    id: string;
    name: string;
    isFolder: boolean;
    children: IFile[];
    content?: string;
}`,
                    children: []
                }
            ]
        },
        {
            id: uuid(),
            name: "styles",
            isFolder: true,
            children: [
                {
                    id: uuid(),
                    name: "index.css",
                    isFolder: false,
                    content:
`@tailwind base;
@tailwind components;
@tailwind utilities;
                    
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
}`,
                    children: []
                }
            ]
        },
        {
            id: uuid(),
            name: "App.tsx",
            isFolder: false,
            content:
`import React from 'react';
import RecursiveComponent from './components/RecursiveComponent';
import { fileTree } from './data/fileTree';
import './styles/index.css';

const App: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">File Explorer</h1>
            <RecursiveComponent data={fileTree} depth={0} />
        </div>
    );
};

export default App;`,
            children: []
        },
        {
            id: uuid(),
            name: "index.tsx",
            isFolder: false,
            content:
`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);`,
            children: []
        }
    ]
};