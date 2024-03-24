import { Box, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import AddForm from './Forms/AddForm';
import ChangeForm from './Forms/ChangeForm';
import Category from '@/types/Category';
import {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useChangeCategoryMutation,
    useDeleteCategoryMutation,
} from '@/services/categoriesApiSlice';
import CategoryAction from './CategoryActions/CategoryActions';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/Loader';

function Categories() {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categoryCount, setCategoryCount] = useState<number>(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const [activeForm, setActiveForm] = useState<boolean>(false);
    const [formType, setFormType] = useState<string>('');

    const [category, setCategory] = useState<Category | undefined>();

    const {
        data: dataCategory,
        isLoading: isLoadingCategory,
        isError: isErrorCategory,
    } = useGetCategoriesQuery({ page: paginationModel.page + 1, limit: paginationModel.pageSize });
    const [addCategory, { isLoading: isLoadingAdd }] = useAddCategoryMutation();
    const [changeCategory, { isLoading: isLoadingChange }] = useChangeCategoryMutation();
    const [deleteCategory, { isLoading: isLoadingDelete }] = useDeleteCategoryMutation();

    const handleAddCategory = async (categoryName: string) => {
        const isConfirm = confirm('Bạn có chắc muốn thêm danh mục này?');
        if (isConfirm) {
            setActiveForm(false);
            try {
                const response = await addCategory({ categoryName }).unwrap();
                if (response.status === 200) {
                    toast.success(response.data.msg);
                }
            } catch (err: any) {
                toast.error(err.data.msg);
            }
        }
    };

    const handleActiveChange = (id: string) => {
        const categoryById = categoryList.filter((item) => item.id === id);
        setCategory(categoryById[0]);
        setActiveForm(true);
        setFormType('change');
    };

    const handleChangeCategory = async (category: Category) => {
        const isConfirm = confirm('Bạn có chắc muốn thay đổi danh mục này?');
        if (isConfirm) {
            setActiveForm(false);
            try {
                const response = await changeCategory(category).unwrap();
                if (response.status === 200) {
                    toast.success(response.data.msg);
                }
            } catch (err: any) {
                toast.error(err.data.msg);
            }
        }
    };

    const handleDeleteCategory = async (id: string) => {
        const isConfirm = confirm('Bạn có chắc muốn xóa danh mục này?');
        if (isConfirm) {
            try {
                const response = await deleteCategory(id).unwrap();
                if (response.status === 200) {
                    toast.success(response.data.msg);
                }
            } catch (err: any) {
                toast.error(err.data.msg);
            }
        }
    };

    useEffect(() => {
        if (dataCategory?.data?.data && !isLoadingCategory && !isErrorCategory) {
            setCategoryList(dataCategory?.data?.data);
        }
    }, [dataCategory?.data?.data, isLoadingCategory, isErrorCategory]);

    useEffect(() => {
        if (dataCategory?.data?.totalItems && !isLoadingCategory && !isErrorCategory) {
            setCategoryCount(dataCategory?.data?.totalItems);
        }
    }, [dataCategory?.data?.totalItems, isLoadingCategory, isErrorCategory]);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 2 },
        { field: 'categoryName', headerName: 'Tên danh mục', flex: 2 },
        {
            field: 'isHotCategory',
            headerName: 'Độ hot danh mục',
            flex: 2,
            renderCell: (params: any) => <>{params.row.isHotCategory === true ? 'Đang hot' : 'Không hot'}</>,
        },
        { field: 'totalJobs', headerName: 'Tổng công việc', flex: 1 },
        {
            field: 'actions',
            headerName: 'Hành động',
            type: 'actions',
            flex: 1,
            renderCell: (params: any) => (
                <CategoryAction params={params} onChange={handleActiveChange} onDelete={handleDeleteCategory} />
            ),
        },
    ];

    return (
        <>
            {(isLoadingCategory || isLoadingAdd || isLoadingChange || isLoadingDelete) && <Loader />}
            <div className=" font-family-text">
                {formType === 'add' ? (
                    <Modal
                        children={<AddForm onAddForm={handleAddCategory} />}
                        open={activeForm}
                        onClose={() => setActiveForm(false)}
                    />
                ) : (
                    <Modal
                        children={<ChangeForm category={category} onChangeForm={handleChangeCategory} />}
                        open={activeForm}
                        onClose={() => setActiveForm(false)}
                    />
                )}

                <button
                    className=" w-[250px] font-family-title font-semibold text-xl text-primary-100 bg-white rounded-md border-2 border-primary-100 mb-[30px] py-2 duration-300 hover:text-white hover:bg-primary-100"
                    onClick={() => {
                        setActiveForm(true);
                        setFormType('add');
                    }}
                >
                    Thêm Danh Mục
                </button>

                <Box sx={{ marginBottom: 10, width: '100%', minHeight: 400 }}>
                    <DataGrid
                        style={{
                            borderRadius: 10,
                            padding: 10,
                            backgroundColor: 'white',
                            borderColor: '#d9d9d9',
                            borderWidth: 2,
                            fontFamily: `'Work Sans', sans-serif`,
                        }}
                        columns={columns}
                        rows={categoryList}
                        rowCount={categoryCount}
                        pageSizeOptions={[5, 10, 25]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        paginationMode="server"
                    />
                </Box>
            </div>
        </>
    );
}

export default Categories;
