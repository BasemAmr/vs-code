import IconImg from "./IconImg"
import extensionToIcon from '../../public/extensionToIcon.json'

interface ExtensionToIcon {
    [key: string]: string;
}

interface FileIconRenderProps {
    name: string
}

const ImgSrc = (fileName: string): string => {
    // Get the extension
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    // Add the dot prefix for extension lookup
    const extensionWithDot = `.${extension}`;
    
    // Check if we have a direct match for the extension
    const iconName = (extensionToIcon as ExtensionToIcon)[extensionWithDot]
    || (extensionToIcon as ExtensionToIcon)[fileName] || '';
    
    // If we found an icon, return it with .svg extension, otherwise return default
    if (iconName) {
        return `${iconName}.svg`;
    }


    
    // Special cases for common files without extensions or specific names
    if (fileName.toLowerCase() === 'dockerfile') {
        return 'docker.svg';
    }
    
    if (fileName.toLowerCase() === 'package.json') {
        return 'npm.svg';
    }
    
    // Default fallback icon
    return 'document.svg';
}

const FileIconRender = ({ name }: FileIconRenderProps) => {

    //get extension of the file name to check for its icon
    const extension = name.split('.').pop() || ''

    return (

        <IconImg src={`../../public/icons/${ImgSrc(extension)}`} /> 
    )
}

export default FileIconRender