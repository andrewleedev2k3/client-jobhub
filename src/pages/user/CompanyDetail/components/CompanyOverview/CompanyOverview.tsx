import Company from '@/types/Company';

type Props = {
    data: Company;
};

function CompanyOverview(props: Props) {
    const { data: company } = props;
    const monthsArray = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const date = new Date(company.establishDate);
    const myEstablishDate = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`
    return (
        <div className=" w-1/3 pl-3 lg:w-full tb:w-full mb:w-full">
            <div className=" w-full border border-[#eee] rounded py-12 px-10 mb-12 mb:py-5 mb:px-4">
                <h3 className=" font-family-title text-content-title text-lg font-semibold mb-6">Tổng quan thông tin:</h3>
                <div className=' w-full'>
                    <div className=" mb-2.5 flex relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:left-0 before:top-[7px] before:absolute">
                        <p className=" text-base pl-3.5 font-medium mb:text-sm mb:flex mb:flex-col">
                            <span className=" text-content-title font-medium mr-1.5">Tên công ty:</span>
                            <p>{company.companyName}</p>
                        </p>
                    </div>
                    <div className=" mb-2.5 flex relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:left-0 before:top-[7px] before:absolute">
                        <p className=" text-base pl-3.5 font-medium mb:text-sm mb:flex mb:flex-col"><span className=" text-content-title font-medium mr-1.5">Trụ sở chính:</span>{company.location.city}</p>
                    </div>
                    <div className=" mb-2.5 flex relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:left-0 before:top-[7px] before:absolute">
                        <p className=" text-base pl-3.5 font-medium mb:text-sm mb:flex mb:flex-col">
                            <span className=" text-content-title font-medium mr-1.5">Ngày thành lập:</span>
                            <p>{myEstablishDate}</p>
                        </p>
                    </div>
                    <div className=" mb-2.5 flex relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:left-0 before:top-[7px] before:absolute">
                        <p className=" text-base pl-3.5 font-medium mb:text-sm mb:flex mb:flex-col">
                            <span className=" text-content-title font-medium mr-1.5">Quy mô:</span>{' '}
                            <p>{company.companySize.from + ' - ' + company.companySize.to} (người)</p>
                        </p>
                    </div>
                    <div className=" mb-2.5 flex relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:left-0 before:top-[7px] before:absolute">
                        <p className=" text-base pl-3.5 font-medium overflow-hidden text-ellipsis whitespace-nowrap mb:text-sm mb:flex mb:flex-col">
                            <span className=" text-content-title font-medium mr-1.5">Email:</span>
                            <p className=' w-full overflow-hidden text-ellipsis whitespace-nowrap'>{company.email}</p>
                        </p>
                    </div>
                    <div className=" mb-2.5 flex relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:left-0 before:top-[7px] before:absolute">
                        <p className=" text-base pl-3.5 font-medium mb:text-sm mb:flex mb:flex-col">
                            <span className=" text-content-title font-medium mr-1.5">Đang đăng tuyển:</span>
                            <p>{company.jobList.length} công việc</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyOverview;
