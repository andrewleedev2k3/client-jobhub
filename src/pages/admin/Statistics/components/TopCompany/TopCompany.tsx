import ItemCompany from './Company';
import { useGetTopCompanyQuery } from '@/services/statisticApiSlice';
import { useState, useEffect } from 'react';
import { StatisticTopCompany } from '@/types/Statistic';
const TopCompany = () => {
    const [companies, setCompanies] = useState<StatisticTopCompany[]>([]);
    const { data, isLoading, isError } = useGetTopCompanyQuery();

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setCompanies(data?.data?.data);
        }
    }, [isLoading, isError, data?.data?.data]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h5 className="font-family-title text-xl font-title">Top Công Ty</h5>
                <h5 className="font-family-text text-content-text font-medium">
                    Top 3 công ty có nhiều bài đăng nhất.
                </h5>
            </div>

            <div className="flex flex-wrap gap-8">
                {companies.map((company, index) => (
                    <ItemCompany key={index} company={company} />
                ))}
            </div>
        </div>
    );
};

export default TopCompany;
