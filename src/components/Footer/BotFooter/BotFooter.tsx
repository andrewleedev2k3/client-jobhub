import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BotFooter() {
    return (
        <div className=" mt-[90px] px-5 relative">
            <img
                className=" top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 absolute lg:hidden tb:hidden mb:hidden"
                src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/footer-logo.svg"
            />

            <div className=" flex items-center justify-between lg:flex-col tb:flex-col mb:flex-col">
                <div className=" flex items-center justify-start border-b border-gray-800 pb-10 xl:flex-col xl:pb-[50px] lg:mb-4 lg:border-none lg:pb-0 lg:w-full lg:justify-center tb:border-none tb:pb-[30px] mb:border-none mb:pb-[25px] ">
                    <div className=" flex">
                        <img
                            className=" pl-3 lg:w-[35px]"
                            src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/footer-support-icon.svg"
                        />
                        <h3 className=" text-lg font-semibold font-family-title before:w-px before:h-5 before:border-l before:border-primary-100 before:mx-2 xl:text-lg mb:text-base">
                            Đường dây hỗ trợ:
                        </h3>
                    </div>
                    <p className=" text-[#00A7AC] text-lg font-medium underline pl-[25px] duration-300 cursor-pointer hover:text-[#b3b3b3] xl:text-lg mb:text-base">
                        +84 96 888 0945
                    </p>
                </div>
                <div className=" flex items-center justify-end border-b border-gray-800 pb-10 pr-3 gap-[40px] xl:flex-col xl:gap-[25px] lg:w-full lg:justify-center lg:mb-4 tb:gap-[20px] mb:flex-col mb:gap-[10px]">
                    <p className="text-[#b3b3b3] text-sm font-medium tracking-wide duration-300 hover:text-primary-100 cursor-pointer xl:text-sm tb:text-sm">
                        Chính sách bảo mật
                    </p>
                    <p className="text-[#b3b3b3] text-sm font-medium tracking-wide duration-300 hover:text-primary-100 cursor-pointer xl:text-sm tb:text-sm">
                        Điều khoản dịch vụ
                    </p>
                    <p className="text-[#b3b3b3] text-sm font-medium tracking-wide duration-300 hover:text-primary-100 cursor-pointer xl:text-sm tb:text-sm">
                        Sơ đồ Website
                    </p>
                </div>
            </div>

            <div className=" flex items-center justify-between py-5 pt-[25px] lg:flex-col tb:flex-col mb:flex-col ">
                <div className=" flex items-center justify-start xl:text-sm">
                    <p className=" text-sm ml-3">
                        Thiết kế và thực hiện bởi
                        <span className=" text-primary-100 duration-300 cursor-pointer hover:text-[#b3b3b3]">
                            {' '}
                            JOBHUB{' '}
                        </span>
                        -- version
                        <span className=" text-primary-100 duration-300 cursor-pointer hover:text-[#b3b3b3]">
                            {' '}
                            1.0.0{' '}
                        </span>
                    </p>
                </div>
                <div className=" flex items-center justify-end lg:mt-2 tb:mt-2 mb:mt-2">
                    <p className=" text-sm font-medium">Theo dõi JOBHUB:</p>
                    <div className=" flex items-center gap-[10px] ml-[15px]">
                        <div className=" flex items-center justify-center w-[26px] h-[26px] text-primary-100 text-sm border border-primary-100 rounded-full">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </div>
                        <div className=" flex items-center justify-center w-[26px] h-[26px] text-primary-100 text-sm border border-primary-100 rounded-full">
                            <FontAwesomeIcon icon={faXTwitter} />
                        </div>
                        <div className=" flex items-center justify-center w-[26px] h-[26px] text-primary-100 text-sm border border-primary-100 rounded-full">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </div>
                        <div className=" flex items-center justify-center w-[26px] h-[26px] text-primary-100 text-sm border border-primary-100 rounded-full">
                            <FontAwesomeIcon icon={faInstagram} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BotFooter;
