import { useGetJobsQuery } from '@/services/jobsApiSlice';

import Job from '@/types/Job';
import { useState, useEffect } from 'react';
import FeaturesItem from './FeaturesItem';
import Skeleton from '@/components/Loading/Skeleton';

import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FilterJob from './FilterJob';

const Features = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [total, setTotal] = useState<number>(0);

    const [city, setCity] = useState<string>('');
    const [query, setQuery] = useState({ limit: 3, p: city });
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { data, isLoading, isError } = useGetJobsQuery(query);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setJobs(data?.data?.data);
        }

        if (total === 0) {
            setTotal(data?.data?.totalItems || 0);
        }

        if (city) {
            setQuery((prevQuery) => ({
                ...prevQuery,
                p: city,
            }));
        }

        setIsLoadingMore(false);
    }, [data?.data?.data, isError, isLoading, city]);

    const seeMoreDataHandler = () => {
        setIsLoadingMore(true);
        const dataLength = jobs.length;
        const newLimit = dataLength + 3;
        if (newLimit <= 9) {
            setIsLoadingMore(true);
            setQuery({ limit: newLimit, p: city });
        } else {
            toast.info('Bạn có thể xem nhiều công việc hơn ở đây nhé!');
            navigate('/job-listing');
        }
    };

    return (
        <div className="w-full pb-6 mb:px-3 tb:px-3 lg:px-3 xl:px-3">
            <FilterJob onSetCity={setCity} />
            {isLoading && (
                <div className="w-full flex justify-between gap-10 mb:flex-col tb:flex-col ">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            )}
            <div></div>
            {data?.data?.data?.length === 0 && (
                <div className="text-content-title text-center font-title text-xl font-family-text">
                    Danh sách công việc <span className="text-primary-100">{city}</span> trống !
                </div>
            )}

            <div className="grid grid-cols-3 gap-6 mb:grid-cols-1 tb:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                {jobs.map((job, index) => (
                    <FeaturesItem key={index} path={`job-detail/${job._id}`} job={job} />
                ))}
            </div>
            {data?.data?.data?.length !== 0 && total !== jobs.length && jobs.length >= 3 && jobs.length <= 9 && (
                <div className="flex items-center justify-center mt-10 font-family-text">
                    <button
                        onClick={() => seeMoreDataHandler()}
                        className="flex items-center rounded-lg gap-2 px-5 py-2 text-white font-semibold bg-primary-100 hover:bg-black duration-300"
                    >
                        {isLoadingMore ? 'Đang tải...' : 'Xem thêm'}
                        <div className="text-xl text-white">
                            <BsArrowRight />
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Features;
