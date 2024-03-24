import Banner from './components/Banner/Banner';
import Section from './components/Section/Section';
import Category from './components/Section/Category/Category';
import Features from './components/Section/Features/Features';
import Process from './components/Section/Process/Process';
import Location from './components/Section/Location/Location';
import Company from './components/Section/Company/Company';
import Recruiters from './components/Section/Recruiters/Recruiters';
import { Swiper as SwiperType } from 'swiper';
import { useRef } from 'react';
const Home = () => {
    const swiperRefLocation = useRef<SwiperType>();
    const swiperRefRecruiters = useRef<SwiperType>();
    const swiperRefCategories = useRef<SwiperType>();

    const titleCategory = (
        <span>
            <span className="text-primary-100">Danh Mục</span> Công Việc
        </span>
    );
    const titleFeatured = (
        <span>
            Việc Làm <span className="text-primary-100">Nổi Bật</span> Mới Nhất
        </span>
    );

    const titleProcess = (
        <span>
            <span className="text-primary-100">Quá Trình</span> Làm Việc
        </span>
    );

    const titleLocation = (
        <span>
            <span className="text-primary-100">Địa Điểm</span> Làm Việc
        </span>
    );

    const titleRecruiters = (
        <span>
            <span className="text-primary-100">Nhà tuyển dụng</span> hàng đầu
        </span>
    );

    return (
        <div className="flex flex-col gap-10">
            <Banner />
            <Section
                title={titleCategory}
                path="category"
                subTitle="Các ngành nghề xu hướng hiện nay và phát triển trong tương lai."
                bg=""
                slick={true}
                right={true}
                swiperRef={swiperRefCategories}
            >
                <Category swiperRef={swiperRefCategories} />
            </Section>
            <Section
                title={titleFeatured}
                subTitle="Bạn có thể tìm kiếm công việc theo tỉnh thành."
                bg="bg-content-bg"
                path="job-listing"
            >
                <Features />
            </Section>

            <Section
                title={titleRecruiters}
                subTitle="Các nhà tuyển dụng uy tín hàng đầu mà bạn có thể tìm hiểu và ứng tuyển."
                bg=""
                right={true}
                path=""
                slick={true}
                swiperRef={swiperRefRecruiters}
            >
                <Recruiters swiperRef={swiperRefRecruiters} />
            </Section>

            <Section
                title={titleProcess}
                subTitle="Hãy làm theo các bước để ứng viên mới có thể dễ dàng tìm việc trên JobHub"
                path=""
                bg=""
            >
                <Process />
            </Section>

            <Company />

            <Section
                title={titleLocation}
                subTitle="Những địa điểm có nền kinh tế phát triển nhất mà mọi người muốn được tiếp cận."
                bg=""
                right={true}
                path=""
                slick={true}
                swiperRef={swiperRefLocation}
            >
                <Location swiperRef={swiperRefLocation} />
            </Section>
        </div>
    );
};

export default Home;
