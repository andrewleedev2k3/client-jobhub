import Category from '@/types/Category';
import { Link } from 'react-router-dom';

const CategoryItem = ({ category, images }: { category: Category; images: string }) => {
    return (
        <Link
            to={`/job-listing?type=${category.id}`}
            className="flex justify-between h-20 items-center border-[2px] border-primary-blur rounded-md p-3 hover:border-primary-100  duration-300 gap-4 tb:justify-center tb:gap-5 mb:justify-center mb:gap-8"
        >
            <img src={images} alt={images} />
            <div className="font-semibold text-lg font-family-text">
                {category.categoryName}
                <span className="ml-2 text-primary-100 font-semibold">({category.totalJobs})</span>
            </div>
        </Link>
    );
};

export default CategoryItem;
