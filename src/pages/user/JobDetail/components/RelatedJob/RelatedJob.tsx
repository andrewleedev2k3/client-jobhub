
import { Link } from 'react-router-dom';
import Job from '@/types/Job';

function RelatedJob({data}: {data: Job}) {
    const date = new Date(data.deadline)
    const myDeadline = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`

    return (
        <div className=" bg-[#fdf9f9] rounded-r pt-6 pb-6 pr-6 pl-6 border-l-4 border-primary-100 ">
            <div className=" flex items-start mb-5 relative mb:flex-col">
                <img className=" w-[50px] h-[50px] rounded-full mr-5 object-cover mb:mx-auto mb:mb-5" src={data.postedBy.photo} />
                <div className=" w-full flex flex-col border-b border-[#eee] pb-3">
                    <h3 className=" w-[250px] tb:w-full mb:w-full font-family-title text-content-title text-lg font-semibold mb-1 overflow-hidden text-ellipsis whitespace-nowrap block duration-300 cursor-pointer hover:text-primary-100 ">{data.title}</h3>
                    <p className=" text-sm">{data.postedBy.companyName}</p>
                </div>
            </div>
            <div className=" bg-white pt-5 pb-5 pr-5 pl-5 flex flex-col">
                <div className=" flex items-start mb-2">
                    <img className=" mt-[7px]" src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/arrow2.svg" />
                    <p className=" text-content-text text-base font-medium ml-1.5">Mức lương: <span className=" text-content-title font-semibold ml-1 mr-1.5">{data.salary.toLocaleString('it') + ' vnđ'} </span></p>
                </div>
                <div className=" flex items-start mb-2">
                    <img className=" mt-[7px]" src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/arrow2.svg" />
                    <p className=" text-content-text text-base font-medium ml-1.5">Địa điểm: {data.postedBy.location.city}</p>
                </div>
                <div className=" flex items-start">
                    <img className=" mt-[7px]" src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/arrow2.svg" />
                    <p className=" text-content-text text-base font-medium ml-1.5">Thời hạn: {myDeadline}</p>
                </div>
            </div>
            <div className=" mt-6 flex items-center relative ">
                <div className=" border border-primary-100 pr-5 pl-5 pt-1 pb-1 rounded-md group duration-300 hover:bg-primary-100 right-0 ">
                    <Link
                        to={'/job-detail/' + data._id}
                        className=" text-primary-100 flex items-center duration-300 group-hover:text-white group-hover:cursor-pointer "
                    >
                        <span className=" text-sm font-medium ">Xem ngay</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RelatedJob;