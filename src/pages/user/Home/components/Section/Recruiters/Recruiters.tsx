import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Grid } from 'swiper/modules';
import RecruitersItem from './RecruitersItem';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Swiper as SwiperType } from 'swiper';
import { useGetCompaniesQuery } from '@/services/companiesApiSlice';
import { useState, useEffect } from 'react';
import Company from '../Company/Company';

const Recruiters = ({ swiperRef }: { swiperRef: React.MutableRefObject<SwiperType | undefined> }) => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const { data, isLoading, isError } = useGetCompaniesQuery({});

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setCompanies(data?.data?.data);
        }
    }, [data?.data?.data, isError, isLoading]);

    return (
        <div className="w-full  mb:px-3 tb:px-3 font-family-text">
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },

                    1279: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                grid={{
                    rows: 2,
                    fill: 'row',
                }}
                modules={[Grid, Autoplay]}
                className="w-full"
            >
                {companies.map((company, index) => (
                    <SwiperSlide key={index}>
                        <RecruitersItem path={`company-detail/${company.id}`} company={company} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Recruiters;
