import { useGetCategoriesQuery } from '@/services/categoriesApiSlice';
import Category from '@/types/Category';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
    categoryChange: (id: string) => void
};
function Category({categoryChange}: Props) {

    const { data, isLoading, isError } = useGetCategoriesQuery({});
    
    const [category, setCategory] = useState<Category[]>([]);
    const [check, setCheck] = useState<boolean>(false);
    const [isId, setIsId] = useState<string>('all');

    const [searchParams] = useSearchParams()
    const type = searchParams.get('type')

    const handleCheck = (cat: Category) => {
        setIsId(cat.id);
        if (isId && isId === cat.id) {
            setCheck(!check);
        }
        categoryChange(cat.id)
    };

    const handleCheckAll = (id: string) => {
        setIsId('all')
        if (isId && isId === id) {
            setCheck(!check);
        }
        categoryChange('')
    }

    useEffect(() => {
        if (data?.data?.data && !isLoading && !isError) setCategory(data?.data?.data);
    }, [data?.data?.data, isLoading, isError]);

    useEffect(() => {
        if (type !== null) {
            setIsId(type)
            categoryChange(type)
    }
    }, [type]);

    return (
        <div className=" bg-white border-[#eee] border rounded-md pt-5 pb-5 pl-6 pr-3 mb-5">
            <h3 className=" font-family-title text-primary-100 font-semibold text-lg mb-2 lg:text-lg">Ngành nghề</h3>
            <div className=" max-h-64 overflow-scroll">
                <div className=" mb-2 flex relative">
                    <div className=" flex items-center cursor-pointer">
                        <input
                            id='all'
                            type="radio"
                            className=" mr-1.5"
                            onChange={() => handleCheckAll('all')}
                            checked={check === true || isId === 'all'}
                        />
                        <label
                            htmlFor='all'
                            className=" text-content-text text-sm font-medium lg:text-sm cursor-pointer"
                        >
                            Tất cả
                        </label>
                    </div>
                    {/* <p className=' text-content-text text-sm font-medium right-2 absolute lg:text-sm cursor-pointer'>({amount})</p> */}
                </div>
                {category.map((cat) => {
                    return (
                        <div key={cat.categoryName} className=" mb-2 relative">
                            <div className=" flex items-center cursor-pointer">
                                <input
                                    id={cat.categoryName}
                                    name={cat.categoryName}
                                    checked={check === true || isId === cat.id}
                                    type="radio"
                                    className=" mr-1.5"
                                    onChange={() => handleCheck(cat)}
                                />
                                <label
                                    htmlFor={cat.categoryName}
                                    className=" text-content-text text-sm font-medium lg:text-sm cursor-pointer"
                                >
                                    {cat.categoryName}
                                </label>
                            </div>
                            {/* <p className=' text-content-text text-sm font-medium right-2 absolute lg:text-sm cursor-pointer'>({amount})</p> */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Category;
