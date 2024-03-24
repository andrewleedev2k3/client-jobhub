import Company from '@/types/Company';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    data: Company[];
}

function CompanyColumn(props: Props) {
    const { data: companyList } = props;
    const navigate = useNavigate()
    return (
        <>
            {companyList.length === 0 && 'Hiện danh mục này chưa có công ty nào'}
            {companyList?.map((company) => {
                const date = new Date(company.establishDate);
                const myEstablishDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                return (
                    <div onClick={() => {navigate('/company-detail/' + company._id)}} key={company._id} className=" w-full border border-[#AEF0F2] rounded-md pl-5 pb-5 mb-6 duration-300 cursor-pointer hover:border-primary-100">
                        <div className=" flex flex-col bg-[#E7F4F5] relative">
                            <div className=" flex items-center">
                                <div className=" flex justify-center items-end w-[60px] h-[100px] bg-[#9CEAEC] -top-[10px] left-0 absolute">
                                    <img className=" w-[45px] h-[45px] rounded-full mb-[20px] object-cover " src={company.photo} />
                                </div>
                                <div className=" -left-2 -top-[10px] absolute">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="8"
                                        height="10"
                                        viewBox="0 0 8 10"
                                        fill="none"
                                    >
                                        <path d="M8 0L7.99991 10H0L8 0Z" fill="#91D9DB" />
                                    </svg>
                                </div>
                                <div className=" left-[60px] -top-[10px] absolute">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="8"
                                        height="10"
                                        viewBox="0 0 8 10"
                                        fill="none"
                                    >
                                        <path d="M8 10L0 0V10H8Z" fill="#91D9DB" />
                                    </svg>
                                </div>
                            </div>
                            <div className=' flex items-center gap-[50px] xl:gap-[35px] lg:gap-0 lg:flex-col lg:items-start tb:gap-0 tb:flex-col tb:items-start mb:gap-0 mb:flex-col mb:items-start '>
                                <div className=' flex flex-col justify-start border-r border-r-primary-200 py-5 lg:w-[150px] lg:border-none lg:pt-5 lg:pb-2 tb:pt-5 tb:pb-2 mb:pt-5 mb:pb-2 tb:border-none mb:border-none '>
                                    <div className=' w-[200px] flex flex-col items-start ml-[70px] mb-8 gap-1.5 xl:w-[180px] lg:w-full tb:w-full tb:mb-full mb:w-full '>
                                        <Link to={'/company-detail/' + company.id} className=' w-[180px] font-family-title text-lg text-content-title font-semibold duration-300 overflow-hidden text-ellipsis whitespace-nowrap lg:overflow-visible tb:overflow-visible mb:overflow-visible block hover:text-primary-100 lg:text-base tb:text-base mb:text-base'>{company.companyName}</Link>
                                        <p className=' flex items-center text-content-text text-sm gap-2'>
                                            <img src='https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/location.svg' />
                                            {company.location.city}
                                        </p>
                                    </div>
                                    <p className=" text-content-text ml-2.5 mr-1.5 lg:text-[15px] lg:hidden tb:hidden mb:hidden ">
                                        Đang tuyển: <span className=" text-primary-100 font-semibold">{company.totalJobCreated} (công việc)</span>
                                    </p>
                                </div>
                                <div className=' w-full flex flex-col py-5 lg:flex-row lg:justify-between lg:w-full lg:px-5 lg:py-0 lg:pb-4 tb:items-start tb:px-5 tb:py-0 tb:pb-5 mb:items-start mb:px-5 mb:py-0 mb:pb-5 '>
                                    <div className=' flex gap-[40px] mb-8 xl:gap-[10px] lg:gap-[10px] lg:mb-0 tb:flex-row tb:gap-[35px] tb:mb-[20px] mb:flex-col mb:mb-0 mb:gap-[6px] '>
                                        <div className=' flex flex-col gap-1.5'>
                                            <div className=' flex items-center'>
                                                <div className=' w-[10px] h-[10px] bg-primary-100 rounded-full lg:w-[7px] lg:h-[7px]'></div>
                                                <p className=' text-[15px] text-content-text mx-1.5 xl:text-sm tb:text-sm mb:text-xs'>Quy mô:</p>
                                                <span className=' text-[15px] text-content-title font-medium lg:text-sm tb:text-sm mb:text-xs'>{company.companySize.from} - {company.companySize.to} người</span>
                                            </div>
                                            <div className=' flex items-center'>
                                                <div className=' w-[10px] h-[10px] bg-primary-100 rounded-full lg:w-[7px] lg:h-[7px]'></div>
                                                <p className=' text-[15px] text-content-text mx-1.5 xl:text-sm tb:text-sm mb:text-xs'>Thành lập:</p>
                                                <span className=' text-[15px] text-content-title font-medium lg:text-sm tb:text-sm mb:text-xs'>{myEstablishDate}</span>
                                            </div>
                                        </div>
                                        <div className=' flex flex-col gap-1.5 pl-[10px] tb:pl-0 mb:pl-0 '>
                                            <div className=' flex items-center'>
                                                <div className=' w-[10px] h-[10px] bg-primary-100 rounded-full lg:w-[7px] lg:h-[7px]'></div>
                                                <p className=' text-[15px] text-content-text mx-1.5 xl:text-sm tb:text-sm mb:text-xs'>Liên lạc:</p>
                                                <span className=' text-[15px] text-content-title font-medium underline lg:text-sm tb:text-sm mb:text-xs'>{company.phoneNumber}</span>
                                            </div>
                                            <div className=' flex items-center'>
                                                <div className=' w-[10px] h-[10px] bg-primary-100 rounded-full lg:w-[7px] lg:h-[7px]'></div>
                                                <p className=' text-[15px] text-content-text mx-1.5 xl:text-sm tb:text-sm mb:text-xs'>Website:</p>
                                                <a href={company.website} className=' text-[15px] text-content-title font-medium underline duration-300 cursor-pointer hover:text-primary-100 lg:text-sm tb:text-sm mb:text-xs'>{company.website || 'Đang cập nhật'}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center justify-center pr-[150px] lg:pr-0 lg:justify-normal tb:items-start tb:pr-0 tb:justify-normal mb:items-start mb:pr-0 mb:justify-normal ">
                                        <div className=" w-[112px] flex border border-primary-100 pr-5 pl-5 pt-1 pb-1 rounded-md group duration-300 cursor-pointer hover:bg-primary-100 right-0 mb:static mb:mt-4 ">
                                            <Link
                                                to={'/company-detail/' + company.id}
                                                className=" text-primary-100 flex items-center duration-300 group-hover:text-white group-hover:cursor-pointer "
                                            >
                                                <span className=" text-sm font-medium mb:text-xs ">Xem thêm</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default CompanyColumn;
