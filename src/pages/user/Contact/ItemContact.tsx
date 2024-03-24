import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { MdEmail } from 'react-icons/md';
interface ItemContact {
    title?: string;
    phone?: string;
    address?: string;
    email?: string;
}
const ItemContact = ({ title, phone, address, email }: ItemContact) => {
    return (
        <div>
            <p className="text-center text-primary-100 text-xl font-semibold">{title}</p>
            <div className="rounded-md border-solid border-2 border-gray-200 mt-5 pl-5 pt-2 leading-10 p-3">
                <p className="flex gap-2 items-center hover:text-[#009FAC] ">
                    <MdEmail className="text-[#009FAC] text-xl" />
                    {email}
                </p>
                <p className="hover:text-[#009FAC] ">
                    <FontAwesomeIcon icon={faPhoneVolume} className="mr-2 text-[#009FAC] " />
                    {phone}
                </p>

                <p className="hover:text-[#009FAC] ">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-[#009FAC] " />
                    {address}
                </p>
            </div>
        </div>
    );
};

export default ItemContact;
