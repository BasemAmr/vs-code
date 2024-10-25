import IconImg from "./IconImg"
import extensionToIcon from '../../public/extensionToIcon.json'

interface ExtensionToIcon {
    [key: string]: string;
}

interface FileIconRenderProps {
    name: string
}

// Helper function to get the correct icon path
const getIconPath = (iconName: string): string => {
    // In production, icons are served from /icons
    // In development, they might be served from /public/icons
    // Using just /icons works in both environments when configured correctly
    return `/icons/${iconName}`;
}

const ImgSrc = (fileName: string): string => {
    // Convert filename to lowercase for consistent matching
    const normalizedFileName = fileName.toLowerCase();
    
    // Get the extension
    const extension = normalizedFileName.split('.').pop() || '';
    const extensionWithDot = extension ? `.${extension}` : '';
    
    // Special cases for specific filenames
    const specialCases: { [key: string]: string } = {
        'dockerfile': 'docker',
        'docker-compose.yml': 'docker',
        'docker-compose.yaml': 'docker',
        'package.json': 'npm',
        'package-lock.json': 'npm',
        '.gitignore': 'git',
        '.env': 'env',
        'readme.md': 'markdown',
        'readme': 'markdown',
        'license': 'license',
        'license.md': 'license',
        'tsconfig.json': 'typescript',
        'manifest.json': 'json'
    };

    // Check for special case files first
    if (specialCases[normalizedFileName]) {
        return `${specialCases[normalizedFileName]}.svg`;
    }

    // Check if we have a direct match for the extension
    const iconName = (extensionToIcon as ExtensionToIcon)[extensionWithDot]
        || (extensionToIcon as ExtensionToIcon)[normalizedFileName]
        || '';

    // If we found an icon, return it with .svg extension
    if (iconName) {
        return `${iconName}.svg`;
    }

    // Group similar extensions
    const extensionGroups: { [key: string]: string } = {
        'js|jsx|cjs|mjs': 'javascript',
        'ts|tsx': 'typescript',
        'md|markdown': 'markdown',
        'yml|yaml': 'yaml',
        'html|htm': 'html',
        'css|scss|sass|less': 'css',
        'json': 'json',
        'svg': 'svg',
        'png|jpg|jpeg|gif|webp': 'image',
        'ttf|otf|woff|woff2': 'font',
        'pdf': 'pdf',
        'zip|rar|7z|tar|gz': 'zip'
    };

    // Check extension groups
    for (const [group, icon] of Object.entries(extensionGroups)) {
        if (new RegExp(`^(${group})$`).test(extension)) {
            return `${icon}.svg`;
        }
    }

    // Default fallback icon
    return 'document.svg';
}

const FileIconRender = ({ name }: FileIconRenderProps) => {
    // Get the icon filename
    const iconFileName = ImgSrc(name);
    
    // Get the full icon path
    const iconPath = getIconPath(iconFileName);

    return (
        <IconImg 
            src={iconPath} 
            alt={`${name} icon`}
            className="w-4 h-4" // Add appropriate sizing
        />
    );
}

export default FileIconRender