import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <div className="">
            <Header />
            <div className="min-h-screen mt-[50px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
