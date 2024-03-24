import JobSeeker from '@/types/JobSeeker';
import Title from './Title';
import { CiLocationOn, CiPhone, CiUser } from 'react-icons/ci';
import { AiOutlineMail } from 'react-icons/ai';
import { IoIosTransgender } from 'react-icons/io';
const ContactInfo = ({ info }: { info?: JobSeeker }) => {
    return (
        <div className="flex gap-8 mb:flex-col">
            <img
                className="w-40  border-[1px] border-primary-100 object-cover rounded-md"
                src={info?.photo}
                alt="avatar"
            />
            <div className="flex flex-col w-full text-sm gap-1 text-content-text">
                <Title title="Thông tin liên hệ" />
                <div className="flex gap-2">
                    <CiUser className="text-xl text-content-title" />
                    {info?.firstName} {info?.lastName}
                </div>
                <div className="flex gap-2">
                    <CiPhone className="text-xl text-content-title" />
                    {info?.phoneNumber}
                </div>
                <div className="flex gap-2">
                    <IoIosTransgender className="text-xl " />
                    {info?.gender === 'male' && 'Nam'}
                    {info?.gender === 'female' && 'Nữ'}
                    {info?.gender === 'others' && 'Khác'}
                </div>
                <div className="flex gap-2">
                    <AiOutlineMail className="text-xl " />
                    {info?.email}
                </div>

                <div className="flex gap-2">
                    <CiLocationOn className="text-xl text-content-title w-8" />
                    {info?.location.address} {info?.location.district} {info?.location.city}
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
