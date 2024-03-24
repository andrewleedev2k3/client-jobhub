
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '@/utils/storage';
import { useLogoutMutation } from '@/services/authApiSlice';
import MainMenu from './MainMenu/MainMenu';
import UserMenu from './UserMenu/UserMenu';
import NonLoginMenu from './NonLoginMenu/NonLoginMenu';
import images from '@/assets/images';
import { useGetCurrentUserQuery } from '@/services/usersApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Header = () => {
    const {data} = useGetCurrentUserQuery()
    const currentUser = useSelector((state: RootState) => state.user.user)
    const [logout] = useLogoutMutation()
    
    const navigate = useNavigate();
    
    const token = getToken()
    
    const handleLogout = () => {
        removeToken()
        logout()
        navigate('/login')
    }

    const user = currentUser ? currentUser : data?.data?.data

    return (
        <>
            <div className=' flex w-full items-center font-family-text text-content-title bg-white top-0 px-[50px] xl:px-[32px] fixed z-20 mb:h-[70px] lg:px-[32px] tb:px-[32px] mb:px-[32px] '>
                <Link to={'/'} className=' mr-[95px] mb:mr-10 '>
                    <img className='w-[140px] py-[10px] xl:w-[100px] xl:mr-[65px] lg:py-2.5 mb:w-[100px]' src={images.logo.logoBlack} />
                </Link>

                <div className=' w-full flex items-center justify-between z-20 lg:justify-end tb:justify-end mb:justify-end'>
                    <MainMenu />
                    {user && token ? <UserMenu user={user} logout={handleLogout} /> : <NonLoginMenu />}
                </div>
            </div>
        </>
    );
};

export default Header;
