
import { NavLink } from "react-router-dom";

function MainMenu() {
    
    return (
        <div className=' flex items-center xl:text-sm lg:hidden tb:hidden mb:hidden '>
            <div className=' flex items-center p-[30px] xl:p-[18px] duration-300 cursor-pointer hover:text-primary-100 hover:font-medium'>
                <NavLink to={'/'} className={nav => nav.isActive ? 'text-primary-100 font-medium' : ''}>Trang chủ</NavLink>
            </div>
            <div className=' flex items-center p-[30px] xl:p-[18px] duration-300 cursor-pointer hover:text-primary-100 relative'>
                <NavLink to={'/job-listing'} className={nav => nav.isActive ? 'text-primary-100 font-medium' : ''}>Tìm việc</NavLink>
            </div>
            <div className=' flex items-center p-[30px] xl:p-[18px] duration-300 cursor-pointer hover:text-primary-100 relative'>
                <NavLink to={'/company-listing'} className={nav => nav.isActive ? 'text-primary-100 font-medium' : ''}>Tìm công ty</NavLink>
            </div>
            <div className=' flex items-center p-[30px] xl:p-[18px] duration-300 cursor-pointer hover:text-primary-100 relative'>
                <NavLink to={'/contact'} className={nav => nav.isActive ? 'text-primary-100 font-medium' : ''}>Liên hệ</NavLink>
            </div>
        </div>
    );
}

export default MainMenu;