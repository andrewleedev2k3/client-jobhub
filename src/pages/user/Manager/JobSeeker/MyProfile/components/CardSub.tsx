import { ReactNode } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import SkillItem from '../Skill/SkillItem';
import ExpItem from '../Experience/ExpItem';
import EduItem from '../Educate/EduItem';
import CerItem from '../Certificate/CerItem';
import ProjectItem from '../Projects/ProjectItem';

interface Card {
    title: string;
    sub: string;
    children?: ReactNode;
    toggleOpen?: () => void;
    open?: boolean;
    data?: any[];
    type?: string;
}
const CardSub = ({ title, sub, children, toggleOpen, open, data, type }: Card) => {
    const renderLayout = (data: any, type: string | undefined) => {
        switch (type) {
            case 'skills':
                return <SkillItem data={data} />;
            case 'experiences':
                return <ExpItem data={data} />;
            case 'education':
                return <EduItem data={data} />;
            case 'certification':
                return <CerItem data={data} />;
            case 'projects':
                return <ProjectItem data={data} />;
            default:
                return null;
        }
    };
    return (
        <div className="flex flex-col gap-8 bg-white shadow-md rounded-md p-5 border-t-2 border-primary-100">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h6 className="font-family-title text-xl font-title text-primary-100">{title}</h6>
                    <p className="whitespace-pre-line font-family-text text-content-text font-medium">{sub}</p>
                </div>

                <button
                    onClick={toggleOpen}
                    className="text-xl font-semibold text-primary-100 hover:text-black duration-200"
                >
                    {!open ? (
                        <BsPlusCircle />
                    ) : (
                        <div className="text-2xl">
                            <AiOutlineMinusCircle />
                        </div>
                    )}
                </button>
            </div>
            {data && renderLayout(data, type)}
            {children}
        </div>
    );
};

export default CardSub;
