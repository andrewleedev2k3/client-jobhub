import Header from '@/components/Admin/Header/Header';
import Sidebar from '@/components/Admin/Sidebar/Sidebar';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function AdminLayout() {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();

    const [activeSidebar, setActiveSidebar] = useState<boolean>(true);

    useEffect(() => {
        if (currentUser && currentUser.role !== 'admin') {
            alert('Chỉ có admin mới có quyền truy cập');
            navigate(-1);
            return;
        }
    }, []);

    return (
        <>
            {currentUser && currentUser.role === 'admin' && (
                <div className="flex bg-[#EEE]">
                    <Sidebar isActiveSidebar={activeSidebar} />
                    <div
                        className={
                            ' w-full min-h-screen flex flex-col duration-300 pr-[30px] ' +
                            (activeSidebar ? 'pl-[330px]' : 'pl-[90px]')
                        }
                    >
                        <Header activeSidebar={setActiveSidebar} />
                        <Outlet />
                    </div>
                    {/* <div onClick={handleLogout}>Logout</div> */}
                </div>
            )}
        </>
    );
}

export default AdminLayout;
