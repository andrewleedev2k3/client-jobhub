import { ArrowAdmin, CategoryAdmin, JobAdmin, StatisticsAdmin, UserAdmin } from "@/components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import images from "@/assets/images";
type SidebarProps = {
    isActiveSidebar: boolean
}
function Sidebar(props: SidebarProps) {
    return (
        props.isActiveSidebar ? (
            <div className=" w-[300px] h-[100vh] font-family-text text-white bg-primary-100 rounded-r-[10px] mr-[30px] duration-300 left-0 fixed">
                <Link className=" flex items-center justify-center w-[150px] h-[120px] mx-auto" to={'/'}><img src={images.logo.logoAdmin} /></Link>
                <div className=" pl-4">
                    <NavLink 
                        to={''} 
                        end
                        className={nav => (nav.isActive ? 
                            'flex items-center text-content-title fill-primary-100 bg-[#EEE] rounded-l-[50px] py-[16px] pl-5 relative' :
                            'flex items-center text-white fill-white py-[18px] pl-5 relative')
                        }
                    >
                        <div className=" w-5 h-5">
                            <StatisticsAdmin />
                        </div>
                        <p className=" pl-3">Thống kê</p>
                        <div className=" right-2 absolute">
                            <ArrowAdmin />
                        </div>
                    </NavLink>
                    <NavLink 
                        to={'users'} 
                        className={nav => (nav.isActive ? 
                            'flex items-center text-content-title fill-primary-100 bg-[#EEE] rounded-l-[50px] py-[16px] pl-5 relative' :
                            'flex items-center text-white fill-white py-[18px] pl-5 relative')
                        }
                    >
                        <div className=" w-5 h-5 ">
                            <UserAdmin />
                        </div>
                        <p className=" pl-3">Người dùng</p>
                        <div className=" right-2 absolute">
                            <ArrowAdmin />
                        </div>
                    </NavLink>
                    <NavLink 
                        to={'jobs'} 
                        className={nav => (nav.isActive ? 
                            'flex items-center text-content-title fill-primary-100 bg-[#EEE] rounded-l-[50px] py-[16px] pl-5 relative' :
                            'flex items-center text-white fill-white py-[18px] pl-5 relative')
                        }
                        >
                        <div className=" w-5 h-5 ">
                            <JobAdmin />
                        </div>
                        <p className=" pl-3">Công việc</p>
                        <div className="  right-2 absolute">
                            <ArrowAdmin />
                        </div>
                    </NavLink>
                    <NavLink 
                    to={'categories'} 
                    className={nav => (nav.isActive ? 
                        'flex items-center text-content-title fill-primary-100 bg-[#EEE] rounded-l-[50px] py-[16px] pl-5 relative' :
                        'flex items-center text-white fill-white py-[18px] pl-5 relative')
                    }
                    >
                        <div className=" w-5 h-5 ">
                            <CategoryAdmin />
                        </div>
                        <p className=" pl-3">Danh mục</p>
                        <div className="  right-2 absolute">
                            <ArrowAdmin />
                        </div>
                    </NavLink>
                </div>
            </div>
        ) : (
            <div className=" w-[60px] h-[100vh] text-white bg-primary-100 rounded-r-[10px] mr-[30px] duration-300 left-0 fixed">
                <Link 
                    to={'/'} 
                    className=" flex items-center justify-center w-full h-5 my-[55px]">
                    <FontAwesomeIcon icon={faHouse} />
                </Link>

                <NavLink 
                    to={''} 
                    className={nav => (nav.isActive ? 
                        'flex items-center text-content-title fill-primary-100 bg-[#EEE] rounded-l-[50px] py-[16px] pl-5 relative' :
                        'flex items-center text-white fill-white py-[18px] pl-5 relative')
                    }
                    >
                    <div className=" w-5 h-5">
                        <StatisticsAdmin />
                    </div>
                </NavLink>

                <NavLink 
                    to={'users'} 
                    className={nav => (nav.isActive ? 
                        'flex items-center text-content-title fill-primary-100 bg-[#EEE] rounded-l-[50px] py-[16px] pl-5 relative' :
                        'flex items-center text-white fill-white py-[18px] pl-5 relative')
                    }
                    >
                    <div className=" w-5 h-5 ">
                        <UserAdmin />
                    </div>
                </NavLink>

                <NavLink 
                    to={'jobs'} 
                    className={nav => (nav.isActive ? 
                        'flex items-center text-content-title fill-primary-100 bg-[#EEE] rounded-l-[50px] py-[16px] pl-5 relative' :
                        'flex items-center text-white fill-white py-[18px] pl-5 relative')
                    }
                    >
                    <div className=" w-5 h-5 ">
                        <JobAdmin />
                    </div>
                </NavLink>

                <NavLink 
                    to={'categories'} 
                    className={nav => (nav.isActive ? 
                        'flex items-center text-content-title fill-primary-100 bg-[#EEE] rounded-l-[50px] py-[16px] pl-5 relative' :
                        'flex items-center text-white fill-white py-[18px] pl-5 relative')
                    }
                    >
                    <div className=" w-5 h-5 ">
                        <CategoryAdmin />
                    </div>
                </NavLink>
            </div>
        )
        
    );
}

export default Sidebar;