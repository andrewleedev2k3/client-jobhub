import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetJobQuery, useGetJobsQuery } from '@/services/jobsApiSlice';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Banner from '@/components/Banner/Banner';
import JobInfo from './components/JobInfo/JobInfo';
import Job from '@/types/Job';
import JobSummary from './components/JobSummary/JobSummary';
import Loader from '@/components/Loader/Loader';
import Comments from './components/Comments/Comments';
import { Swiper, SwiperSlide } from 'swiper/react';
import RelatedJob from './components/RelatedJob/RelatedJob';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function JobDetail() {
    const [job, setJob] = useState<Job>();
    const [jobByCategory, setJobByCategory] = useState<Job[]>([]);
    const [isImgDetail, setIsImgDetail] = useState<boolean>(false);

    const { id } = useParams();

    const imgRef = useRef<HTMLImageElement>(null)

    const { data, isLoading, isError } = useGetJobQuery(id!);
    const {
        data: jobRelate,
        isLoading: isLoadingJobRelate,
        isError: isErrorJobRelate,
    } = useGetJobsQuery({ type: job?.type.id });

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setJob(data?.data?.data);
        }
    }, [isLoading, isError, data?.data?.data]);

    useEffect(() => {
        if (!isLoadingJobRelate && !isErrorJobRelate && jobRelate?.data?.data) {
            setJobByCategory(jobRelate?.data?.data);
        }
    }, [isLoadingJobRelate, isErrorJobRelate, jobRelate?.data?.data]);

    useEffect(() => {
        let handlerClickOutside = (e:any) => {
            if(!imgRef.current?.contains(e.target)) {
                setIsImgDetail(false)
            }
        }
        document.addEventListener('mousedown', handlerClickOutside)
    }, [imgRef])

    useLayoutEffect(() => {
        scrollTo(0, 0);
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            {isImgDetail && (
                <div className=' w-full h-[100vh] bg-[rgba(0,0,0,0.5)] top-0 left-0 fixed z-50'>
                    <div className=' flex items-center justify-center  w-full h-full mx-auto '>
                        <div onClick={() => setIsImgDetail(false)} className=' flex items-center justify-center w-[100px] h-[60px] text-4xl text-gray-500 bg-[rgba(0,0,0,.6)] rounded-md absolute top-0 right-0 z-50 cursor-pointer hover:bg-[rgba(0,0,0,.4)]'>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <Swiper
                            slidesPerView={1}
                            // modules={[Pagination, Navigation]}
                        >
                            {job?.photosJob.map((data, index) => {
                                return (
                                    <SwiperSlide className=' w-full h-full flex items-center justify-center ' key={index}>
                                        <img ref={imgRef} className=' flex items-center justify-center rounded-md object-cover ' src={data} />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            )}
            <div className=" font-family-text selection:bg-primary-100 selection:text-white">
                <div className=" mb-28 ">
                    <Banner page="Chi tiết công việc" />

                    <div className=" w-10/12 mx-auto pt-16 flex lg:flex-col tb:flex-col mb:flex-col ">
                        {!isLoading && !isError && job && <JobInfo data={job} />}
                        {!isLoading && !isError && job && <JobSummary data={job} />}
                    </div>

                    <div className=" w-10/12 mb-10 mx-auto">
                        <h1 className=" font-family-title text-content-title text-2xl font-semibold mb-10">
                            Hình ảnh về công việc:
                        </h1>
                        {job?.photosJob.length === 0 ? (
                            <div>Không có hình ảnh nào về công ty hiện tại</div>
                        ) : (
                            <Swiper
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    600: {
                                        spaceBetween: 20,
                                        slidesPerView: 2,
                                    },
                                    1000: {
                                        spaceBetween: 20,
                                        slidesPerView: 3,
                                    },
                                    1500: {
                                        spaceBetween: 30,
                                        slidesPerView: 4,
                                    },
                                    1912: {
                                        spaceBetween: 30,
                                        slidesPerView: 5,
                                    },
                                }}
                                // modules={[Pagination, Navigation]}
                            >
                                {job?.photosJob.map((data, index) => {
                                    return (
                                        <SwiperSlide
                                            onClick={() => setIsImgDetail(!isImgDetail)}
                                            className=" cursor-pointer"
                                            key={index}
                                        >
                                            <img className="w-full h-[180px] rounded-md object-cover" src={data} />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        )}
                    </div>

                    {!isLoading && !isError && job && <Comments data={job} />}

                    <div className=" w-10/12 mx-auto">
                        <h1 className=" font-family-title text-content-title text-2xl font-semibold mb-10">
                            Công việc liên quan:
                        </h1>
                        {jobByCategory.length === 1 ? (
                            <div>Không có công việc nào liên quan hiện tại</div>
                        ) : (
                            <Swiper
                                breakpoints={{
                                    0: {
                                        spaceBetween: 10,
                                        slidesPerView: 1,
                                    },
                                    870: {
                                        spaceBetween: 20,
                                        slidesPerView: 2,
                                    },
                                    1500: {
                                        spaceBetween: 30,
                                        slidesPerView: 3,
                                    },
                                    1912: {
                                        spaceBetween: 30,
                                        slidesPerView: 4,
                                    },
                                }}
                                // modules={[Pagination, Navigation]}
                            >
                                {jobByCategory.map((data, index) => {
                                    if (data._id === job?._id) return;
                                    return (
                                        <SwiperSlide key={data._id}>
                                            <RelatedJob data={data} />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default JobDetail;
