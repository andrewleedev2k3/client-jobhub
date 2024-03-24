import { useGetJobDeletedQuery } from '@/services/companiesApiSlice';
import { useEffect, useState } from 'react';
import Item from './components/Item';
import { Pagination } from '@mui/material';
import Skeleton from '@/components/Loading/Skeleton';

const JobDeleted = () => {
    const [jobDeleted, setJobDeleted] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState({ page: page, limit: 4 });
    const [total, setTotal] = useState<number>(0);
    const { data, isLoading, isError } = useGetJobDeletedQuery(query);
    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setJobDeleted(data?.data?.data);
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
            {data?.data?.data?.length === 0 && (
                <div className="font-family-text text-center border border-primary-100 p-5 text-xl mb:text-lg mb:p-3 rounded-md">
                    Thùng rác rỗng!
                </div>
            )}

            {isLoading && (
                <div className="flex flex-col gap-4">
                    <Skeleton />
                    <Skeleton />
                </div>
            )}

            <div className="flex flex-col gap-6">
                {jobDeleted.map((job, index) => (
                    <Item key={index} job={job} />
                ))}
            </div>

            {jobDeleted.length > 0 && (
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

export default JobDeleted;
