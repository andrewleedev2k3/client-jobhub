import { Link } from 'react-router-dom';

const CompanyItem: React.FC<{ logo: string; id: string }> = ({ logo, id }) => {
    return (
        <Link to={`/company-detail/${id}`}>
            <img className="w-[196px] h-[88px] object-cover rounded-md" src={logo} alt={logo} />
        </Link>
    );
};

export default CompanyItem;
