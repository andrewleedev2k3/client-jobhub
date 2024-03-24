import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useGetAllJobsQuery, useGetJobsNotAcceptQuery, useGetJobsQuery } from '@/services/jobsApiSlice';
import Job from '@/types/Job';
import useDebounce from '@/hooks/useDebounce';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FaCheck } from 'react-icons/fa';
import { useApproveJobMutation, useDeleteJobMutation } from '@/services/jobsApiSlice';
import { toast } from 'react-toastify';
import { AiFillDelete } from 'react-icons/ai';
import Loader from '@/components/Loader/Loader';
import ConfirmDelete from '@/components/Dialog/ConfirmDelete';

function Jobs() {
    const [data, setData] = useState<Job[]>([]);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [agree, setAgree] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const [total, setTotal] = useState<number>(0);

    const [query, setQuery] = useState({ page: page });

    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<string>('all');

    const { data: jobsAll, isLoading: jobAllLoading, isError: jobAllError } = useGetAllJobsQuery(query);

    const debouncedSearchValue = useDebounce(searchValue || '', 300);

    const { data: jobsNotAccept, isLoading: jobNotAcceptLoading } = useGetJobsNotAcceptQuery(query);

    const { data: jobsAccept, isLoading: jobAcceptLoading } = useGetJobsQuery(query);

    const [deleteJob, { isLoading: isLoadingDeleteJob }] = useDeleteJobMutation();
    const [approveJob, { isLoading: isLoadingApproveJob }] = useApproveJobMutation();

    useEffect(() => {
        if (!jobAllLoading && !jobAllError && jobsAll?.data?.data && selectedTab == 'all') {
            setData(jobsAll?.data?.data);
            if (total === 0) {
                setTotal(jobsAll?.data?.totalItems || 0);
            } else {
                setTotal(jobsAll?.data?.totalItems || 0);
            }
        }

        if (!jobAcceptLoading && jobsAccept?.data?.data && selectedTab == 'accepted') {
            setData(jobsAccept?.data?.data);
            if (total === 0) {
                setTotal(jobsAccept?.data?.totalItems || 0);
            } else {
                setTotal(jobsAccept?.data?.totalItems || 0);
            }
        }

        if (!jobNotAcceptLoading && jobsNotAccept?.data?.data && selectedTab == 'notAccepted') {
            setData(jobsNotAccept?.data?.data);
            if (total === 0) {
                setTotal(jobsNotAccept?.data?.totalItems || 0);
            } else {
                setTotal(jobsNotAccept?.data?.totalItems || 0);
            }
        }
    }, [
        jobsAll?.data?.data,
        jobAllLoading,
        jobAllError,

        jobsAccept?.data?.data,
        jobAcceptLoading,

        jobsNotAccept?.data?.data,
        jobNotAcceptLoading,
    ]);

    useEffect(() => {
        setQuery((prevQuery) => ({
            ...prevQuery,
            q: debouncedSearchValue,
        }));
    }, [debouncedSearchValue]);

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
        setPage(1);
        setQuery((prevQuery) => ({
            ...prevQuery,
            page: 1,
        }));

        if (tab === 'all') {
            setData(jobsAll?.data?.data || []);
            setTotal(jobsAll?.data?.totalItems || 0);
        } else if (tab === 'accepted') {
            setData(jobsAccept?.data?.data || []);
            setTotal(jobsAccept?.data?.totalItems || 0);
        } else if (tab === 'notAccepted') {
            setData(jobsNotAccept?.data?.data || []);
            setTotal(jobsNotAccept?.data?.totalItems || 0);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        if (agree) {
            if (id) {
                deleteJob(id)
                    .unwrap()
                    .then(() => {
                        toast.success('Xoá thành công!');
                    })
                    .catch((error) => {
                        console.error('Error deleting:', error);
                        toast.error('Đã xảy ra lỗi khi xoá.');
                    })
                    .finally(() => setAgree(false));
            }
        }
    }, [agree]);

    const approveJobHandler = async (id: string) => {
        try {
            const res = await approveJob(id).unwrap();
            if (res.status === 200) {
                toast.success(res.data.msg);
            }
        } catch (error: any) {
            if (error.status === 400) {
                toast.error(error.data.msg);
            }
        }
    };
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'title', headerName: 'Tên công việc', flex: 3 },
        {
            field: 'company',
            headerName: 'Công ty',
            description: 'Bạn có thể xem công ty!',
            sortable: true,
            flex: 3,
        },
        {
            field: 'salary',
            headerName: 'Mức lương (VNĐ)',
            type: 'number',
            align: 'left',
            flex: 2,
        },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            description: 'Bạn có thể xem tỉnh thành phố!',
            sortable: true,
            flex: 3,
        },
        {
            field: 'state',
            headerName: 'Trạng thái',
            sortable: false,
            flex: 2,
            renderCell: (params) =>
                params.row.state ? (
                    <div className="flex items-center justify-center p-2 bg-primary-100 text-white font-medium rounded-lg w-28 shadow-md">
                        Đã Duyệt
                    </div>
                ) : (
                    <div className="flex items-center justify-center p-2 bg-blue-gray-400 w-28  w-100 text-gray-100 font-medium rounded-lg ">
                        Chưa Duyệt
                    </div>
                ),
        },
        {
            field: 'action',
            headerName: 'Hành động',
            flex: 2,
            align: 'center',
            sortable: false,
            renderCell: (params) => (
                <div className="flex gap-4">
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded-lg text-lg hover:bg-red-200 hover:text-black duration-300"
                        onClick={() => {
                            setOpenConfirmDelete(true);
                            setId(params.row.id);
                        }}
                    >
                        <AiFillDelete />
                    </button>
                    {!params.row.state && (
                        <button
                            className="bg-primary-100 text-white px-2 py-1 rounded-lg hover:bg-primary-200 hover:text-black duration-300"
                            onClick={() => approveJobHandler(params.row.id)}
                        >
                            <FaCheck />
                        </button>
                    )}
                </div>
            ),
        },
    ];

    const rows = data.map((job) => ({
        id: job._id,
        title: job.title,
        company: job.postedBy.companyName,
        salary: job.salary,
        address: `${job.postedBy.location.city}, ${job.postedBy.location.district}` || 'Unknown',
        state: job.isAccepted,
        action: 'Xoá',
    }));
    const isLoading =
        isLoadingApproveJob || isLoadingDeleteJob || jobAllLoading || jobAcceptLoading || jobNotAcceptLoading;

    return (
        <div className="flex flex-col gap-5 pb-10">
            {isLoading && <Loader />}

            <div className="flex justify-between items-center">
                <div className="flex gap-5 font-family-title text-primary-100 font-medium">
                    <button
                        className={`py-2 px-4 border-2 border-secondary-100 rounded-3xl ${
                            selectedTab === 'all' ? 'bg-primary-100 text-white' : ''
                        }`}
                        onClick={() => handleTabClick('all')}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`p-2 px-4 border-2 rounded-3xl border-secondary-100 ${
                            selectedTab === 'accepted' ? 'bg-primary-100 text-white' : ''
                        }`}
                        onClick={() => handleTabClick('accepted')}
                    >
                        Đã duyệt
                    </button>
                    <button
                        className={`p-2 px-4 border-2 rounded-3xl border-secondary-100 ${
                            selectedTab === 'notAccepted' ? 'bg-primary-100 text-white' : ''
                        }`}
                        onClick={() => handleTabClick('notAccepted')}
                    >
                        Chưa duyệt
                    </button>
                </div>

                <div className="flex items-center border-2 rounded-full border-primary-100">
                    <input
                        value={searchValue}
                        type="text"
                        className="h-12 w-80 rounded-l-3xl outline-none border-none px-5 font-family-text text-content-text bg-transparent"
                        placeholder="Tìm kiếm công việc ..."
                        onChange={handleInputChange}
                    />
                    <div className="flex items-center px-4 text-white font-extrabold rounded-r-3xl text-xl bg-primary-100 h-12 ">
                        <BiSearch />
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3 font-family-text ">
                    <h5 className="text-content-title font-title text-lg">Hiển thị {total} kết quả việc làm.</h5>
                </div>
            </div>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    style={{
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: 'white',
                        borderColor: '#d9d9d9',
                        borderWidth: 2,
                        fontFamily: `'Work Sans', sans-serif`,
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 7 },
                        },
                    }}
                    pageSizeOptions={[3, 7, 9, 12, 14]}
                />
            </div>
            {openConfirmDelete && (
                <ConfirmDelete open={openConfirmDelete} onSetOpen={setOpenConfirmDelete} onSetAgree={setAgree} />
            )}
        </div>
    );
}

export default Jobs;
