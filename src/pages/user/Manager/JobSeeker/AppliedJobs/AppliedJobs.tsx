import { useGetMyApplicationQuery } from '@/services/jobseekerApiSlice';
import { useEffect, useState } from 'react';
import ItemJob from './components/ItemJob';
import Skeleton from '@/components/Loading/Skeleton';
import { Pagination } from '@mui/material';

const AplliedJobs = () => {
    const [jobApplication, setJobApplication] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState({ page: page, limit: 4 });
    const [total, setTotal] = useState<number>(0);
    const { data, isLoading, isError } = useGetMyApplicationQuery(query);

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setJobApplication(data?.data?.data);
        }
        if (total === 0) {
            setTotal(data?.data?.totalItems || 0);
        } else {
            setTotal(data?.data?.totalItems || 0);
        }
    }, [isLoading, isError, data?.data?.data]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
        setQuery((prevQuery) => ({
            ...prevQuery,
            page: newPage,
        }));
    };

    return (
        <>
            {isLoading && (
                <div className="flex flex-col gap-4">
                    <Skeleton />
                    <Skeleton />
                </div>
            )}
            {data?.data?.data?.length === 0 && (
                <div className="font-family-text text-center border border-primary-100 p-5 text-xl">
                    Danh sách trống.
                </div>
            )}
            <div className="flex flex-col gap-4">
                {jobApplication.map((job, index) => (
                    <ItemJob key={index} job={job} />
                ))}
            </div>

            {jobApplication.length > 0 && (
                <Pagination
                    className="flex mt-5 justify-end"
                    count={Math.ceil(total / query.limit)}
                    page={page}
                    onChange={handlePageChange}
                />
            )}
        </>
    );
};

export default AplliedJobs;
