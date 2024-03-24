import { ReactNode } from 'react';
import { FiEdit } from 'react-icons/fi';
interface Card {
    children: ReactNode;
    handleOpen: () => void;
}
const Card = ({ children, handleOpen }: Card) => {
    return (
        <div className="flex items-center justify-between p-5 bg-white rounded-md shadow-md border-t-4 border-primary-100">
            {children}
            <button
                onClick={handleOpen}
                className="text-xl font-semibold text-primary-100 hover:text-black duration-200 mb:text-xl mb:mb-20"
            >
                <FiEdit />
            </button>
        </div>
    );
};

export default Card;
