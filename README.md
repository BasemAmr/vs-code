# VS Code Clone

A Visual Studio Code clone built with React, TypeScript, Redux, and Tailwind CSS. Features a file explorer with recursive directory structure, syntax highlighting, and a tabbed interface for opened files.

## Features

### File Explorer
- **Recursive Component**: Dynamically renders the file tree structure
- **Folder and File Icons**: SVG icons for folders and files, including custom icons for specific file types and folder names

### Tabs for Opened Files
- **FileTabsBar Component**: Displays tabs for all opened files
- **FileTab Component**: Individual tabs for opened files with close functionality

### Syntax Highlighting
- **HighlightedSyntax Component**: Implements `react-syntax-highlighter` for code file syntax highlighting

### State Management
- **Redux**: Manages opened files and currently selected file states
- **fileTreeSlice**: Contains actions and reducers for file management

### Icons and Styling
- **SVG Icons**: Custom icons for different file types and folder names
- **Tailwind CSS**: Utility-first CSS framework for styling

### Utility
- **UUID**: Generates unique IDs for files and folders

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vscode-clone.git

# Navigate to project directory
cd vscode-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

## File Structure

```
src/
├── components/
│   ├── SVG/
│   ├── FileTab.tsx
│   ├── FileTabsBar.tsx
│   ├── RecursiveComponent.tsx
│   └── HighlightedSyntax.tsx
├── app/
│   └── features/
│       └── fileTreeSlice.ts
└── public/
    └── extensionToIcon.json
```

## Configuration Files

- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `index.html`: Application entry point

## Usage

1. **Opening Files**
   - Click on any file in the file explorer to open it in a new tab

2. **Closing Tabs**
   - Click the close icon (×) on a tab to close it

3. **Syntax Highlighting**
   - Files automatically display with syntax highlighting based on their extension



## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments
- Big thanks for Codeawy for their valuable project walkthrough 
- Icons based on VS Code's icon theme
- Built with React and modern web technologies
