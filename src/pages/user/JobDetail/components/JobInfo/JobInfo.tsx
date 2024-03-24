import Job from '@/types/Job';
import { Link } from 'react-router-dom';
type Props = {
    data: Job;
};
function JobInfo(props: Props) {
    const { data: job } = props;

    const date = new Date(job.deadline)
    const myDeadline = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`
    return (
        <div className=" w-2/3 pl-3 pr-3 lg:w-full tb:w-full mb:w-full ">
            <div className=" h-1.5 bg-primary-100 rounded-t-lg"></div>
            <div className=" border-b border-[#eee] pt-6 pb-6 pr-4 rounded-b-lg pl-4 mb-8 flex items-center justify-between bg-[#f8f8f8] xl:flex-col xl:items-start lg:flex-col lg:items-start tb:flex-col tb:items-start mb:items-start mb:flex-col">
                <div className=" w-[220px] xl:w-full lg:w-full tb:w-full mb:w-full flex xl:mb-7 lg:mb-7 tb:mb-7 mb:mb-7">
                    <div className="w-[220px] xl:w-full lg:w-full tb:w-full mb:w-full flex items-center mb:flex-col mb:items-start ">
                        <img className=" w-10 h-10 rounded-full mr-2.5 object-cover mb:mx-auto " src={job.postedBy.photo} />
                        <div className=" mb:w-full flex flex-col">
                            <h3 className=" w-[220px] xl:w-full lg:w-full tb:w-full mb:w-full text-content-title font-family-title text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer duration-300 hover:text-primary-100 ">
                                {job.title}
                            </h3>
                            <Link to={'/company-detail/' + job.postedBy.id} className=" w-full overflow-hidden text-ellipsis whitespace-nowrap text-content-text text-sm font-medium duration-300 hover:text-primary-100 lg:text-sm">
                                {job.postedBy.companyName}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-end xl:ml-5 lg:flex-col tb:flex-col mb:flex-col mb:ml-0">
                    <div className=" mr-6 xl:mr-3 lg:mb-2 tb:mb-2 mb:mb-2">
                        <div className=" mb-2 flex items-center relative">
                            <img
                                className=" mr-1.5 top-[5px] absolute"
                                src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/map-2.svg"
                            />
                            <p className=" text-content-text text-base font-normal ml-4">
                                {job.postedBy.location.city}
                            </p>
                        </div>
                        <div className=" flex items-center relative">
                            <img
                                className=" mr-1.5 top-[5px] absolute"
                                src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/salary-2.svg"
                            />
                            <p className=" text-content-text text-base font-normal ml-5">
                                {job.salary.toLocaleString('it')}vnđ / tháng
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className=" mb-2 flex items-center relative">
                            <img
                                className=" mr-1.5 top-[5px] absolute"
                                src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/company-2.svg"
                            />
                            <p className=" text-content-text text-base font-normal ml-5">
                                <span className=" text-content-title font-medium mr-1.5">Thời hạn:</span>{myDeadline}
                            </p>
                        </div>
                        <div className=" flex items-center relative">
                            <img
                                className=" mr-1.5 top-[5px] absolute"
                                src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/category-2.svg"
                            />
                            <p className=" text-content-text text-base font-normal ml-5">
                                <span className=" text-content-title font-medium mr-1.5">Ngành:</span>
                                {job.type.categoryName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* Skill require */}
                <div className=" mb-9">
                    <div className=" text-content-text text-base font-medium">
                        <p className=" font-family-title text-content-title text-lg font-semibold mr-2 mb-3">
                            Kĩ năng cần có:
                        </p>
                        <div>
                            {job.skillsRequire?.map((skill) => {
                                return (
                                    <p
                                        key={skill}
                                        className=" text-content-text text-base font-medium flex items-center mb-2.5 ml-3 relative before:w-2 before:h-2 before:rounded-full before:bg-primary-100 before:-ml-3 before:pr-2 before:top-2 before:absolute"
                                    >
                                        {skill}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className=" mb-9">
                    <div className=" text-content-text text-base font-medium mb-3">
                        <span className=" font-family-title text-content-title text-lg font-semibold mr-2">
                            Mô tả công việc:
                        </span>
                        <div className="whitespace-pre-line">{job.description}</div>
                    </div>
                </div>

                <div className=" mb-9">
                    <div className=" text-content-text text-base font-medium">
                        <span className=" font-family-title text-content-title text-lg font-semibold mr-2">
                            Yêu cầu ứng viên:
                        </span>
                        <div className="whitespace-pre-line">{job.jobRequire}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobInfo;
