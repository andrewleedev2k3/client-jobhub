import { useState } from "react";
import JobseekerTab from "./Tabs/JobseekerTab";
import CompanyTab from "./Tabs/CompanyTab";
import BanTab from "./Tabs/BanTab";
import images from "@/assets/images";
import Loader from "@/components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";

function User() {

    const [tab, setTab] = useState<string>('jobseeker')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const styleForTab = (arg: string) => {
        if(arg === tab) {
            return ' flex items-center justify-between w-[250px] bg-white text-primary-100 border-t-8 border-t-primary-100 rounded-[10px] shadow-xl p-5 cursor-pointer'
        } else {
            return ' flex items-center justify-between w-[250px] bg-white text-primary-100 border-t-8 border-t-transparent rounded-[10px] shadow-xl p-5 cursor-pointer'
        }
    }

    return (
        <>
            {isLoading && <Loader />}

            {/* tab */}
            <div className=" flex items-center justify-start font-family-text mb-[30px] gap-[30px]">
                <div className={styleForTab('jobseeker')} onClick={() => setTab('jobseeker')}>
                    <div className={" border border-primary-100 rounded p-2.5 "}>
                        <img src={images.admin.jobseekerAdmin} />
                    </div>
                    <div className=" flex flex-col items-end justify-end gap-[15px] ">
                        <p className=" text-lg">Người Tìm Việc</p>
                    </div>
                </div>
                <div className={styleForTab('company')} onClick={() => setTab('company')}>
                    <div className={" border border-primary-100 rounded p-2.5 "}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M22.5 23.625C22.5 24.2466 21.9966 24.75 21.375 24.75H14.625C14.0034 24.75 13.5 24.2466 13.5 23.625V20.25H0V30.375C0 32.175 1.575 33.75 3.375 33.75H32.625C34.425 33.75 36 32.175 36 30.375V20.25H22.5V23.625ZM32.625 9H27V5.625C27 3.825 25.425 2.25 23.625 2.25H12.375C10.575 2.25 9 3.825 9 5.625V9H3.375C1.575 9 0 10.575 0 12.375V18H36V12.375C36 10.575 34.425 9 32.625 9ZM22.5 9H13.5V6.75H22.5V9Z" fill="#00A7AC"/>
                    </svg>
                    </div>
                    <div className=" flex flex-col items-end justify-end gap-[15px] ">
                        <p className=" text-lg">Doanh Nghiệp</p>
                    </div>
                </div>
                <div className={styleForTab('banned')} onClick={() => setTab('banned')}>
                    <div className={" border border-primary-100 rounded p-2.5 "}>
                        <div className=" w-9 h-9">
                            <FontAwesomeIcon className=" w-full h-full" icon={faUserSlash} />
                        </div>
                    </div>
                    <div className=" flex flex-col items-end justify-end gap-[15px] ">
                        <p className=" text-lg">Người Bị Cấm</p>
                    </div>
                </div>
            </div>

            {/* table */}
            {tab === 'jobseeker' && <JobseekerTab setIsLoading={setIsLoading} />}
            {tab === 'company' && <CompanyTab setIsLoading={setIsLoading} />}
            {tab === 'banned' && <BanTab setIsLoading={setIsLoading} />}
        </>
    );
}

export default User;