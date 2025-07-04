interface filterButtonProps {
    text: string;
    index: number;
    filter: string;
    filterType: string;
    onClick: () => void;
}
const FilterButton = ({
    text,
    index,
    onClick,
    filter,
    filterType,
}: filterButtonProps) => {
    return (
        <button
            onClick={() => onClick()}
            className={`px-4 py-2 transition-colors border border-solid border-gray-400 ${
                filter === filterType
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            } 
            ${index === 0 && "rounded-l-xl"} ${index === 2 && "rounded-r-xl"}`}
        >
            {text}
        </button>
    );
};
export default FilterButton;
