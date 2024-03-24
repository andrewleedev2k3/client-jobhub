import { NavLink } from 'react-router-dom';

import Job from '@/types/Job';
import { formatDate } from '@/utils/date';
import { formatNumberToVND } from '@/utils/number';

const FeaturesItem = ({ job, path }: { job: Job; path: string }) => {
    const date: string = formatDate(job?.deadline);
    const salary: string = formatNumberToVND(job?.salary);

    return (
        <NavLink to={path} className="group">
            <div className="bg-white  rounded-r pt-9 pb-9 pr-6 pl-6 border-l-4 border-primary-blur group-hover:border-primary-100 font-family-text shadow-md h-72">
                <div className=" flex items-center mb-5 relative h-1/4">
                    <img className="w-[52px] h-[52px] object-cover rounded-full mr-5" src={job.postedBy.photo} />
                    <div className="w-full flex flex-col  pb-3">
                        <h3 className=" text-primary-100 text-lg font-semibold mb-1">{job.title}</h3>
                        <p className="text-sm">{job.postedBy.companyName}</p>
                    </div>
                </div>
                <div className=" bg-[#fcfcfc]  flex flex-col p-4 gap-1">
                    <div className=" flex items-start ">
                        <img
                            className="mt-[5px]"
                            src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/arrow2.svg"
                        />
                        <p className=" text-content-text text-base font-medium ml-1.5">
                            Lương: <span className=" text-content-title font-semibold ml-1 mr-1.5">{salary} /</span>
                            Tháng
                        </p>
                    </div>
                    <div className="flex items-start">
                        <img
                            className=" mt-[5px]"
                            src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/arrow2.svg"
                        />
                        <p className=" text-content-text text-base font-medium ml-1.5">
                            Địa điểm: {job?.postedBy?.location?.city}
                        </p>
                    </div>

                    <div className=" flex items-start ">
                        <img
                            className=" mt-[5px]"
                            src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/arrow2.svg"
                        />
                        <p className=" text-content-text text-base font-medium ml-1.5">Thời hạn: {date}</p>
                    </div>
                    <div className="flex items-start">
                        <img
                            className=" mt-[5px]"
                            src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/arrow2.svg"
                        />
                        <p className=" text-content-text text-base font-medium ml-1.5">
                            Số lượng: {job?.numberRecruitment}
                        </p>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default FeaturesItem;
