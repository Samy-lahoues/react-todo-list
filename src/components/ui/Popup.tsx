import type { ReactNode } from "react";
const Popup = ({
    children,
    onClose,
    padding,
    width,
    height,
}: {
    children: ReactNode;
    onClose: () => void;
    padding: string;
    width: number;
    height: number;
}) => {
    return (
        <div
            onClick={onClose}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            className="absolute w-full z-10 top-0 left-0 h-screen flex flex-center"
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
