import Search from './Search';
const Banner: React.FC = () => {
    return (
        <div className="relative bg-bannerHome bg-cover flex py-20  lg:bg-center  lg:py-10">
            <div className="absolute inset-0 bg-[rgba(0,0,0,.75)]"></div>

            <div className="flex-grow flex flex-col justify-center items-center text-white p-8 z-10">
                <div className="text-center">
                    <h2 className="font-family-title text-6xl font-bold mb-5 mb:text-4xl">
                        <span className="text-primary-100">Cơ hội </span>
                        nghề nghiệp của bạn.
                    </h2>
                </div>

                <Search />
            </div>
        </div>
    );
};

export default Banner;
