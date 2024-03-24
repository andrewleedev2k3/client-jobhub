import { ManageAdmin } from "@/components/Icons";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
type HeaderProps = {
    activeSidebar: (sidebar: boolean) => void
}
function Header(props: HeaderProps) {
    const currentUser = useSelector((state: RootState) => state.user.user)

    const [sidebar, setSidebar] = useState<boolean>(true)

    const myURL = window.location.href
    const page = new URL(myURL)
    
    const [title, setTitle] = useState<any>(() => {
        if(page.pathname === '/admin') {
            return 'Thống kê'
        } else if(page.pathname === '/admin/users') {
            return 'Quản lí người dùng'
        } else if(page.pathname === '/admin/jobs') {
            return 'Quản lí công việc'
        } else if(page.pathname === '/admin/categories') {
            return 'Quản lí danh mục'
        } else if(page.pathname === '/admin/profile') {
            return 'profile'
        } else if(page.pathname === '/admin/setting') {
            return 'setting'
        } else {
            return
        }
    })

    useEffect(() => {
        if(page.pathname === '/admin') {
            setTitle('Thống kê')
        } else if(page.pathname === '/admin/users') {
            setTitle('Quản lí người dùng')
        } else if(page.pathname === '/admin/jobs') {
            setTitle('Quản lí công việc')
        } else if(page.pathname === '/admin/categories') {
            setTitle('Quản lí danh mục')
        } else if(page.pathname === '/admin/profile') {
            setTitle('profile')
        } else if(page.pathname === '/admin/setting') {
            setTitle('setting')
        } else {
            return
        }
    }, [page, myURL])

    const toggleActiveSidebar = () => {
        setSidebar(!sidebar)
        props.activeSidebar(sidebar)
    }

    return (
        <div className=" w-[100%] flex items-center justify-between font-family-text text-content-title mb-[30px] py-5">
            <div className=" flex items-center gap-[30px]">
                <div className="flex cursor-pointer" onClick={() => toggleActiveSidebar()}>
                    <ManageAdmin />
                </div>
                <h1 className=" font-family-title text-2xl font-semibold">{title}</h1>
            </div>
            <div className=" flex items-center gap-[30px]">
                <img className=" w-10 h-10 rounded-full object-cover" src={currentUser?.photo} />
                <div className=" flex flex-col">
                    <h3 className=" font-family-title font-semibold">{currentUser?.lastName + ' ' +  currentUser?.firstName}</h3>
                    <p>{currentUser?.role}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;