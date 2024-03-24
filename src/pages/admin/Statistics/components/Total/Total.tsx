import { FaList, FaUserAlt } from 'react-icons/fa';
import Item from './Item';
import { MdWork } from 'react-icons/md';
import { BiSolidUserDetail } from 'react-icons/bi';
import { useGetStatisticTotalQuery } from '@/services/statisticApiSlice';
import { StatisticTotal } from '@/types/Statistic';
import { useState, useEffect } from 'react';
import Skeleton from '@/components/Loading/Skeleton';

const Total = () => {
    const { data, isLoading, isError } = useGetStatisticTotalQuery();
    const [total, setTotal] = useState<StatisticTotal>();

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setTotal(data?.data?.data);
        }
    }, [data?.data?.data, isError, isLoading]);

    return (
        <>
            {isLoading ? (
                <div className="w-full flex  gap-10 mb:flex-col tb:flex-col ">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            ) : (
                <div className="flex gap-10">
                    <Item icon={<FaUserAlt />} title="Người dùng" total={total?.totalUsers} path="users" />
                    <Item icon={<MdWork />} title="Đơn xin việc" total={total?.totalApplications} path="jobs" />
                    <Item icon={<BiSolidUserDetail />} title="Công việc" total={total?.totalJobs} path="jobs" />
                    <Item icon={<FaList />} title="Danh mục" total={total?.totalApplications} path="categories" />
                </div>
            )}
        </>
    );
};

export default Total;
