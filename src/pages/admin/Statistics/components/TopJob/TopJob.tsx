import { useState, useEffect } from 'react';
import JobItem from './Job';
import { useGetTopJobQuery } from '@/services/statisticApiSlice';
import { StatisticTopJob } from '@/types/Statistic';

const TopJob = () => {
    const [jobs, setJobs] = useState<StatisticTopJob[]>();

    const { data, isLoading, isError } = useGetTopJobQuery();

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setJobs(data?.data?.data);
        }
    }, [isLoading, isError, data?.data?.data]);

    return (
        <div className="flex flex-col  w-[30%]  gap-6 font-family-text">
            <div className="flex flex-col gap-1">
                <h5 className="font-family-title text-xl font-title">Top Công Việc</h5>
                <h5 className="font-family-text text-content-text font-medium">
                    Top 3 công việc có nhiều đơn ứng tuyển nhất.
                </h5>
            </div>

            <div className="flex flex-col gap-5 border-2 border-primary-100 p-4 rounded-xl">
                {jobs?.map((job, index) => (
                    <JobItem key={index} job={job} />
                ))}
            </div>
        </div>
    );
};

export default TopJob;
