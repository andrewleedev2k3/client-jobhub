import { useGetProvincesQuery } from '@/services/utilsApiSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { Autoplay } from 'swiper/modules';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
const FilterJob = ({ onSetCity }: { onSetCity: Dispatch<React.SetStateAction<string>> }) => {
    const { data, isLoading, isError } = useGetProvincesQuery();

    const [provices, setProvinces] = useState<any[]>([]);

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setProvinces(data?.data?.data);
        }
    }, [data?.data?.data, isError, isLoading]);

    const swiperRef = useRef<SwiperType>();

    return (
        <div className="flex flex-col gap-8 font-family-text  justify-center items-center mb-10">
            <div className="flex gap-8 w-[80%] justify-between items-center ">
                <button
                    onClick={() => swiperRef?.current?.slidePrev()}
                    className="p-1 rounded-full border-2 border-primary-100 hover:border-primary-blur duration-200 group"
                >
                    <div className="text-primary-100 text-2xl group-hover:text-primary-blur duration-200">
                        <IoIosArrowBack />
                    </div>
                </button>

                {isLoading && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )}
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
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                        639: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        767: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1023: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1279: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                    }}
                    className="flex items-center"
                >
                    {provices?.map((item: any, index: any) => (
                        <SwiperSlide key={index}>
                            <div
                                onClick={() => onSetCity(item.name)}
                                className="p-2 border-primary-100 border-2 text-center rounded-lg cursor-pointer hover:text-white hover:bg-primary-100 duration-200 font-medium"
                            >
                                {item.name}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    onClick={() => swiperRef?.current?.slideNext()}
                    className="p-1 rounded-full border-2 border-primary-100 hover:border-primary-blur duration-200 group"
                >
                    <div className="text-primary-100 text-2xl group-hover:text-primary-blur duration-200">
                        <IoIosArrowForward />
                    </div>
                </button>
            </div>

            <div
                onClick={() => onSetCity(' ')}
                className="p-2 border-primary-100 border-2 text-center rounded-lg cursor-pointer hover:text-white hover:bg-primary-100 duration-200 font-medium"
            >
                Xem tất cả công việc
            </div>
        </div>
    );
};

export default FilterJob;
