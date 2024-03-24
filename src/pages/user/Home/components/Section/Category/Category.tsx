import { useGetCategoriesQuery } from '@/services/categoriesApiSlice';
import CategoryItem from './CategoryItem';
import images from '@/assets/images';
import Category from '@/types/Category';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import { Autoplay } from 'swiper/modules';
import { Box, LinearProgress } from '@mui/material';
const Category = ({ swiperRef }: { swiperRef: React.MutableRefObject<SwiperType | undefined> }) => {
    const { data, isLoading, isError } = useGetCategoriesQuery({});
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setCategories(data?.data?.data);
        }
    }, [data?.data?.data, isError, isLoading]);

    return (
        <>
            {isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}

            {data?.data?.data?.length === 0 && (
                <div className="text-content-title text-center font-title text-xl font-family-text">
                    Danh sách danh mục trống !
                </div>
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
                spaceBetween={15}
                slidesPerView={1}
                breakpoints={{
                    639: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    767: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1023: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    1279: {
                        slidesPerView: 5,
                        spaceBetween: 15,
                    },
                }}
                className="w-full mb:px-3 tb:px-3"
            >
                {categories.map((cate, index) => (
                    <SwiperSlide key={index}>
                        <CategoryItem key={index} category={cate} images={images.categories.finance} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Category;
