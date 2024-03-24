import Banner from '@/components/Banner/Banner';

import ItemContact from './ItemContact';
const Contact = () => {
    return (
        <div>
            <Banner page="Liên hệ" />
            <div className="max-w-7xl ml-auto mr-auto mt-11 flex justify-between mb:px-3 tb:px-3 lg:px-3">
                <div className="w-[100%] grid grid-cols-3 gap-10 text-[1.125rem] font-normal font-family-text mb:grid-cols-1 tb:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                    <ItemContact
                        title="CHI NHÁNH HỒ CHÍ MINH"
                        phone="84+ 968880945"
                        email="jobhubhcm@gmail.vn"
                        address="QTSC 9, CVPM Quang Trung, Quận 12"
                    />
                    <ItemContact
                        title="CHI NHÁNH HÀ NỘI"
                        phone="84+ 968880945"
                        email="jobhubhn@gmail.vn"
                        address="12 Hai Bà Trưng, Cửa Nam, Hoàn Kiếm"
                    />
                    <ItemContact
                        title="CHI NHÁNH ĐÀ NẴNG"
                        phone="84+ 968880945"
                        email="jobhubdnm@gmail.vn"
                        address="121 Trần Thái Tông, An Khê, Thanh Khê"
                    />
                </div>
            </div>

            <div className="mt-10">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4435924064937!2d106.62525347481908!3d10.853826357761717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1692362389005!5m2!1svi!2s"
                    width="600"
                    height="450"
                    loading="lazy"
                    className="w-full"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
