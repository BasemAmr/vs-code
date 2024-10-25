interface IProps {
    positions: { 
        x: number, 
        y: number 
    };
    onClose: () => void;
    onCloseTab: () => void;
    onCloseAll: () => void;
}

const PropMenu = ({ positions: {x, y}, onClose, onCloseTab, onCloseAll }: IProps) => {
    return (
        <div 
            className="fixed inset-0 z-40"
            onClick={onClose}
        >
            <ul 
                className="context-menu bg-[#20252c] py-2 w-48 rounded-md absolute z-50 shadow-lg text-gray-200"
                style={{ 
                    top: `${y}px`, 
                    left: `${x}px`
                }}
                onClick={e => e.stopPropagation()}
            >
                <li 
                    className="px-4 py-1.5 hover:bg-[#282c34] cursor-pointer"
                    onClick={onCloseTab}
                >
                    Close
                </li>
                <hr className="border-[#282c34] my-1"/>
                <li 
                    className="px-4 py-1.5 hover:bg-[#282c34] cursor-pointer"
                    onClick={onCloseAll}
                >
                    Close All
                </li>
            </ul>
        </div>
    );
};

export default PropMenu;