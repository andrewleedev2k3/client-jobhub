import CompanyItem from './CompanyItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import { Autoplay } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { useGetCompaniesQuery } from '@/services/companiesApiSlice';
import Company from '@/types/Company';
import { Box, LinearProgress } from '@mui/material';

const Company = () => {
    const swiperRef = useRef<SwiperType>();

    const [companies, setCompanies] = useState<Company[]>([]);
    const { data, isLoading, isError } = useGetCompaniesQuery({});

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setCompanies(data?.data?.data);
        }
    }, [data?.data?.data, isError, isLoading]);

    return (
        <div className="bg-[#D9F2F3]">
            <div className="max-w-7xl mx-auto  py-14 flex flex-col justify-between lg:px-3 mb:px-3 tb:px-3 xl:px-3">
                <div className="flex gap-3 items-center">
                    <h4 className="text-lg text-content-title font-semibold font-family-title">Các công ty uy tín</h4>
                    <span className="h-[2px] w-32 bg-primary-200"></span>
                </div>
                {isLoading && (
                    <Box sx={{ width: '100%', pt: 3 }}>
                        <LinearProgress />
                    </Box>
                )}
                <div className="flex mt-5">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={30}
                        slidesPerView={2}
                        breakpoints={{
                            683: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            767: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1023: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                            1279: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                        className="w-full"
                    >
                        {companies.map((company, index) => (
                            <SwiperSlide key={index}>
                                <CompanyItem logo={company.photo} id={company._id} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Company;
