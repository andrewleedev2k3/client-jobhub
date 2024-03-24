import Info from './Info/Info';
import InfoCompany from './InfoCompany/InfoCompany';

const MyProfile = () => {
    return (
        <div className="flex flex-col">
            <Info />
            <InfoCompany />
        </div>
    );
};

export default MyProfile;
