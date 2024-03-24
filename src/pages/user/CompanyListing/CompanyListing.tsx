import { useEffect, useLayoutEffect, useState } from 'react';
import Banner from '@/components/Banner/Banner';
import CompanyColumn from './components/CompanyColumn/CompanyColumn';
import CompanyGutter from './components/CompanyGutter/CompanyGutter';
import Company from '@/types/Company';
import { useGetCompaniesQuery } from '@/services/companiesApiSlice';
import Sidebar from './components/Sidebar/Sidebar';
import { ListColumn, ListGutter } from '@/components/Icons';
import Skeleton from '@/components/Loading/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type filterObject = {
    name: string;
    city: string;
};
function CompanyListing() {
    const [companyList, setCompanyList] = useState<Company[]>([])
    const [totalCompany, setTotalCompany] = useState<number>(0)
    const [filter, setFilter] = useState<filterObject>({name: '', city: ''})
    const [page, setPage] = useState<number>(1);
    const [listStyle, setListStyle] = useState('gutter');

    const pageNumber = totalCompany && totalCompany % 6 === 0 ? totalCompany / 6 : Math.floor(totalCompany / 6 + 1);

    const { data, isLoading, isError } = useGetCompaniesQuery((filter.city !== '' && filter.city === 'allLocation') ? {
        q: filter.name,
        page,
        limit: 6
    } : {
        q: filter.name,
        page,
        limit: 6,
        p: filter.city
    });

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
            setCompanyList(data?.data?.data);
        }
    }, [data?.data?.data, isLoading, isError]);

    useEffect(() => {
        if (!isLoading && !isError && typeof data?.data?.totalItems === 'number') {
            setTotalCompany(data?.data?.totalItems);
        }
    }, [data?.data?.data, data?.data?.totalItems, isLoading, isError]);

    useLayoutEffect(() => {
        scrollTo(0, 0);
    }, []);

    return (
        <div className=" font-family-text selection:bg-primary-100 selection:text-white mb-[30px]">
            <Banner page="Tìm công ty" />

            <div className=" max-w-7xl ml-auto mr-auto pt-[50px] flex justify-between xl:ml-7 xl:mr-7 xl:max-w-7xl lg:max-w-4xl lg:flex-col lg:ml-auto lg:mr-auto tb:flex-col tb:max-w-3xl mb:flex-col mb:max-w-2xl">
                {/* job sidebar */}

                <Sidebar filter={handleFilter} />

                {/* list */}
                <div className=" w-3/4 ml-3 mr-3 flex flex-col xl:ml-auto xl:mr-auto lg:pr-0 lg:w-10/12 lg:mx-auto tb:w-10/12 tb:mx-auto mb:w-11/12 mb:mx-auto">
                    <div className=" mb-6 pl-3 pr-3 flex justify-between mb:flex-col mb:items-start ">
                        <p className="text-content-text font-medium pt-2 pb-2">
                            Đang hiển thị <span className=" text-primary-100 font-semibold">{totalCompany}</span> công
                            ty
                        </p>
                        <div className=' flex items-center'>
                            <button className=" mr-5 ml-7 mb:ml-0" onClick={() => setListStyle('gutter')}>
                                <ListGutter color={listStyle} />
                            </button>
                            <button onClick={() => setListStyle('column')}>
                                <ListColumn color={listStyle} />
                            </button>
                        </div>
                    </div>
                    <div>
                        {/* item */}
                        {isLoading && [...Array(5)].map((item, index) => <div key={index} className=' mb-7'><Skeleton />{item}</div>)}
                        {!isLoading && !isError && companyList && listStyle === 'column' && <CompanyColumn data={companyList} />}
                        {!isLoading && !isError && companyList && listStyle === 'gutter' && <CompanyGutter data={companyList} />}
                        <div className=' flex justify-center'>
                            {pageNumber !== 1 && companyList.length < 7 && <div 
                                className={page > 1 ? 'flex justify-center items-center w-10 h-10 text-primary-100 text-lg font-semibold border-2 border-primary-100 rounded-full mr-2 ml-2 cursor-pointer' : ' flex justify-center items-center w-10 h-10 text-content-text text-lg font-semibold bg-gray-400 rounded-full mr-2 ml-2 cursor-default'} 
                                onClick={handleDecreasePage}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>}
                            {pageNumber !== 1 && companyList.length < 7 && [...Array(pageNumber)].map((item, index) => (
                                <div 
                                    key={index} 
                                    className={index + 1 === page ? ' flex justify-center items-center w-10 h-10 text-white text-lg font-semibold bg-primary-100 rounded-full mr-2 ml-2 cursor-default' : ' flex justify-center items-center w-10 h-10 text-primary-100 text-lg font-semibold border-2 border-primary-100 rounded-full mr-2 ml-2 cursor-pointer'} 
                                    onClick={() => {
                                        window.scrollTo(0, 0)
                                        setPage(index + 1)
                                    }}>{item}{index + 1}
                                </div>
                            ))}
                            {pageNumber !== 1 && companyList.length < 7 && <div 
                                className={page < pageNumber ? 'flex justify-center items-center w-10 h-10 text-primary-100 text-lg font-semibold border-2 border-primary-100 rounded-full mr-2 ml-2 cursor-pointer' : ' flex justify-center items-center w-10 h-10 text-content-text text-lg font-semibold bg-gray-400 rounded-full mr-2 ml-2 cursor-default'} 
                                onClick={handleIncreasePage}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyListing;
