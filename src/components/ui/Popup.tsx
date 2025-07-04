import type { ReactNode } from "react";
const Popup = ({
    children,
    padding,
    onBgClick,
    width,
    height,
}: {
    children: ReactNode;
    padding: string;
    onBgClick: () => void;
    width: number;
    height: number;
}) => {
    return (
        <div
            onClick={onBgClick}
            className="absolute w-full z-10 top-0 left-0 h-screen bg-black-transparent flex flex-center"
        >
            <div
                style={{ width, height }}
                onClick={(e) => e.stopPropagation()}
                className={`dark:bg-white dark:text-black font-bold rounded-lg shadow-lg ${padding}`}
            >
                {children}
            </div>
        </div>
    );
};
export default Popup;
