import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Manager = () => {
    return (
        <div className="bg-[#f8f8f8] min-h-screen">
            <div className="max-w-7xl mx-auto flex justify-between gap-8 py-10 mb:flex-col mb:px-3 tb:px-3 tb:flex-col lg:px-3 lg:flex-col xl:px-6 xl:flex-col">
                <Sidebar />
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Manager;
