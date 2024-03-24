import { useGetJobApplicationQuery } from '@/services/companiesApiSlice';
import { useEffect, useState } from 'react';
import Item from './components/Item';
import { useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';

const JobApplication = () => {
    const { id } = useParams<string>();
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState({ page: page, limit: 4 });
    const [total, setTotal] = useState<number>(0);
    const [jobApplycation, setJobApplycation] = useState<any[]>([]);
    const { data, isLoading, isError } = useGetJobApplicationQuery({
        id,
        query,
    });

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setJobApplycation(data?.data?.data);
        }
        if (total === 0) {
            setTotal(data?.data?.totalItems || 0);
        } else {
            setTotal(data?.data?.totalItems || 0);
        }
    }, [data?.data?.data, isLoading, isError]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
        setQuery((prevQuery) => ({
            ...prevQuery,
            page: newPage,
        }));
    };

    return (
        <>
            <div className="flex flex-col gap-6">
                {jobApplycation.map((candicate, index) => (
                    <Item key={index} candicate={candicate} />
                ))}
            </div>
            {data?.data.data.length === 0 && (
                <div className="font-family-text text-center border border-primary-100 p-5 text-xl">
                    Chưa có ứng viên đăng ký
                </div>
            )}
            {jobApplycation.length > 0 && (
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

export default JobApplication;
