import { useEffect, useLayoutEffect, useState } from 'react';
import 'rc-slider/assets/index.css';
import Banner from '@/components/Banner/Banner';
import Sidebar from './components/Sidebar/Sidebar';
import { useGetJobsQuery } from '@/services/jobsApiSlice';
import Job from '@/types/Job';
import JobColumn from './components/JobColumn/JobColumn';
import JobGutter from './components/JobGutter/JobGutter';
import { ListColumn, ListGutter } from '@/components/Icons';
import Skeleton from '@/components/Loading/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type filterObject = {
    name: string;
    idCat: string;
    salary: { min: number; max: number };
    city: string;
    skills: string[];
};
const JobListing = () => {
    const [jobList, setJobList] = useState<Job[]>([]);
    const [totalJob, setTotalJob] = useState<number>(0);
    const [filter, setFilter] = useState<filterObject>({
        name: '',
        idCat: '',
        salary: { min: 1000000, max: 100000000 },
        city: '',
        skills: [],
    });
    const [listStyle, setListStyle] = useState<'column' | 'gutter'>('gutter');
    const [page, setPage] = useState<number>(1);

    const pageNumber = totalJob && totalJob % 6 === 0 ? totalJob / 6 : Math.floor(totalJob / 6 + 1);

    const { data, isLoading, isError } = useGetJobsQuery(
        filter.idCat !== '' && filter.city !== '' && filter.skills.length !== 0
            ? {
                  q: filter.name,
                  page,
                  limit: 6,
                  'salary[gte]': filter.salary.min,
                  'salary[lte]': filter.salary.max,
                  sort: '-createdAt',
                  type: filter.idCat,
                  p: filter.city,
                  'skillsRequire[in]': filter.skills,
              }
            : filter.idCat !== '' && filter.city !== '' && filter.skills.length === 0
            ? {
                  q: filter.name,
                  page,
                  limit: 6,
                  'salary[gte]': filter.salary.min,
                  'salary[lte]': filter.salary.max,
                  sort: '-createdAt',
                  type: filter.idCat,
                  p: filter.city,
              }
            : filter.idCat !== '' && filter.city === '' && filter.skills.length !== 0
            ? {
                  q: filter.name,
                  page,
                  limit: 6,
                  'salary[gte]': filter.salary.min,
                  'salary[lte]': filter.salary.max,
                  sort: '-createdAt',
                  type: filter.idCat,
                  'skillsRequire[in]': filter.skills,
              }
            : filter.idCat === '' && filter.city !== '' && filter.skills.length !== 0
            ? {
                  q: filter.name,
                  page,
                  limit: 6,
                  'salary[gte]': filter.salary.min,
                  'salary[lte]': filter.salary.max,
                  sort: '-createdAt',
                  p: filter.city,
                  'skillsRequire[in]': filter.skills,
              }
            : filter.idCat !== '' && filter.city === '' && filter.skills.length === 0
            ? {
                  q: filter.name,
                  page,
                  limit: 6,
                  'salary[gte]': filter.salary.min,
                  'salary[lte]': filter.salary.max,
                  sort: '-createdAt',
                  type: filter.idCat,
              }
            : filter.idCat === '' && filter.city !== '' && filter.skills.length === 0
            ? {
                  q: filter.name,
                  page,
                  limit: 6,
                  'salary[gte]': filter.salary.min,
                  'salary[lte]': filter.salary.max,
                  sort: '-createdAt',
                  p: filter.city,
              }
            : filter.idCat === '' && filter.city === '' && filter.skills.length !== 0
            ? {
                  q: filter.name,
                  page,
                  limit: 6,
                  'salary[gte]': filter.salary.min,
                  'salary[lte]': filter.salary.max,
                  sort: '-createdAt',
                  'skillsRequire[in]': filter.skills,
              }
            : {
                  q: filter.name,
                  page,
                  limit: 6,
                  'salary[gte]': filter.salary.min,
                  'salary[lte]': filter.salary.max,
                  sort: '-createdAt',
              },
    );

    const handleFilter = (filterObj: filterObject) => {
        setFilter(filterObj);
        setPage(1);
    };

    const handleDecreasePage = () => {
        if (page > 1) {
            window.scrollTo(0, 0);
            setPage((prev) => prev - 1);
        }
    };

    const handleIncreasePage = () => {
        if (page < pageNumber) {
            window.scrollTo(0, 0);
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setJobList(data?.data?.data);
        }
    }, [jobList, totalJob, data?.data?.data, isLoading, isError]);

    useEffect(() => {
        if (!isLoading && !isError && typeof data?.data?.totalItems === 'number') {
            setTotalJob(data?.data?.totalItems);
        }
    }, [jobList, totalJob, data?.data?.data, data?.data?.totalItems, isLoading, isError]);

    useLayoutEffect(() => {
        scrollTo(0, 0);
    }, []);

    return (
        <>
            <Banner page="Tìm việc" />
            <div className=" max-w-7xl font-family-text ml-auto mr-auto pt-[50px] flex justify-between xl:mx-7 xl:max-w-7xl lg:max-w-4xl lg:flex-col lg:ml-auto lg:mr-auto tb:flex-col tb:max-w-3xl mb:flex-col mb:max-w-2xl">
                <Sidebar filter={handleFilter} />
                <div className=" w-3/4 ml-3 mr-3 flex flex-col xl:mx-auto lg:mx-auto tb:mx-auto mb:mx-auto lg:pr-0 lg:w-10/12 tb:w-10/12 mb:w-11/12">
                    <div className=" mb-6 pl-3 pr-3 flex items-center justify-between mb:flex-col mb:items-start">
                        <p className="text-content-text font-medium pt-2 pb-2">
                            Đang hiển thị <span className=" text-primary-100 font-semibold">{jobList.length}</span> công
                            việc
                        </p>
                        <div>
                            <button className=" mr-5 ml-7 mb:ml-0" onClick={() => setListStyle('gutter')}>
                                <ListGutter color={listStyle} />
                            </button>
                            <button onClick={() => setListStyle('column')}>
                                <ListColumn color={listStyle} />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col h-full justify-between mb-10">
                        {isLoading &&
                            [...Array(6)].map((item, index) => (
                                <div key={index} className=" mb-7">
                                    <Skeleton />
                                    {item}
                                </div>
                            ))}
                        {!isLoading && !isError && jobList && listStyle === 'column' && <JobColumn data={jobList} />}
                        {!isLoading && !isError && jobList && listStyle === 'gutter' && <JobGutter data={jobList} />}
                        <div className=" flex justify-center">
                            {pageNumber !== 1 && jobList.length < 7 && (
                                <div
                                    className={
                                        page > 1
                                            ? 'flex justify-center items-center w-10 h-10 mb:w-7 mb:h-7 mb:text-base text-primary-100 text-lg font-semibold border-2 border-primary-100 rounded-full mr-2 ml-2 cursor-pointer'
                                            : ' flex justify-center items-center w-10 h-10 mb:w-7 mb:h-7 mb:text-base text-content-text text-lg font-semibold bg-gray-400 rounded-full mr-2 ml-2 cursor-default'
                                    }
                                    onClick={handleDecreasePage}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </div>
                            )}
                            {pageNumber !== 1 &&
                                jobList.length < 7 &&
                                [...Array(pageNumber)].map((item, index) => (
                                    <div
                                        key={index}
                                        className={
                                            index + 1 === page
                                                ? ' flex justify-center items-center w-10 h-10 mb:w-7 mb:h-7 mb:text-base text-white text-lg font-semibold bg-primary-100 rounded-full mr-2 ml-2 cursor-default'
                                                : ' flex justify-center items-center w-10 h-10 mb:w-7 mb:h-7 mb:text-base text-primary-100 text-lg font-semibold border-2 border-primary-100 rounded-full mr-2 ml-2 cursor-pointer'
                                        }
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            setPage(index + 1);
                                        }}
                                    >
                                        {item}
                                        {index + 1}
                                    </div>
                                ))}
                            {pageNumber !== 1 && jobList.length < 7 && (
                                <div
                                    className={
                                        page < pageNumber
                                            ? 'flex justify-center items-center w-10 h-10 mb:w-7 mb:h-7 mb:text-base text-primary-100 text-lg font-semibold border-2 border-primary-100 rounded-full mr-2 ml-2 cursor-pointer'
                                            : ' flex justify-center items-center w-10 h-10 mb:w-7 mb:h-7 mb:text-base text-content-text text-lg font-semibold bg-gray-400 rounded-full mr-2 ml-2 cursor-default'
                                    }
                                    onClick={handleIncreasePage}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobListing;
