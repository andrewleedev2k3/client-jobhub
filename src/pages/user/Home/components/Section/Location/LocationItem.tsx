import images from '@/assets/images';
import { Link } from 'react-router-dom';
type Location = {
    imgLocation: string;
    location: string;
    path: string;
};
const LocationItem: React.FC<Location> = ({ imgLocation, location, path }) => {
    return (
        <Link
            to={`/job-listing?p=${path}`}
            className="flex flex-col items-center group cursor-pointer font-family-text gap-3"
        >
            <div className="relative rounded max-w-xs overflow-hidden bg-cover bg-no-repeat">
                <img
                    className="h-44 w-72 object-cover group-hover:scale-110 duration-300"
                    src={imgLocation}
                    alt="imgLocation"
                />
            </div>

            <div className="flex items-center gap-2">
                <img className="w-5 h-5" src={images.logo.location} alt={images.logo.location} />
                <h5 className="group-hover:text-primary-100 text-xl font-semibold text-content-title duration-300">
                    {location}
                </h5>
            </div>
        </Link>
    );
};

export default LocationItem;
