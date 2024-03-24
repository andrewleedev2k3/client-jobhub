import { Swiper, SwiperSlide } from 'swiper/react';
import LocationItem from './LocationItem';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import images from '@/assets/images';
interface Location {
    path: string;
    imgLocation: string;
    name: string;
}
const locationData: Location[] = [
    {
        path: 'Thành phố Hồ Chí Minh',
        imgLocation: images.logo.benthanh,
        name: 'Hồ Chí Minh',
    },
    {
        path: 'Thành phố Hà Nội',
        imgLocation: images.logo.hoguom,
        name: 'Hà Nội',
    },
    {
        path: 'Thành phố Hoà Bình',
        imgLocation: images.logo.hoabinh,
        name: 'Hoà Bình',
    },
    {
        path: 'Tỉnh Thừa Thiên Huế',
        imgLocation: images.logo.hue,
        name: 'Huế',
    },
    {
        path: 'Thành phố Nha Trang',
        imgLocation: images.logo.nhatrang,
        name: 'Nha Trang',
    },
];

const Location = ({ swiperRef }: { swiperRef: React.MutableRefObject<SwiperType | undefined> }) => {
    return (
        <div className="flex">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1023: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1279: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                className="w-full"
            >
                {locationData.map((location, index) => (
                    <SwiperSlide key={index}>
                        <LocationItem
                            path={location.path}
                            imgLocation={location.imgLocation}
                            location={location.name}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Location;
