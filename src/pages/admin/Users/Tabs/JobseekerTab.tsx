import { useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useBanUserMutation } from "@/services/usersApiSlice";
import { useGetJobseekersQuery } from "@/services/jobseekerApiSlice";
import { toast } from "react-toastify";
import JobSeeker from "@/types/JobSeeker";
import UserActions from "../UserActions/UserActions";

function JobseekerTab({setIsLoading}: {setIsLoading: (arg: boolean) => void}) {

    const [jobseekerList, setJobseekerList] = useState<JobSeeker[]>([])
    const [jobseekerCount, setjobseekerCount] = useState<number>(0)
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5
    })

    const {data: dataJobseeker, isLoading: isLoadingJobseeker, isError: isErrorJobseeker} = useGetJobseekersQuery({page: paginationModel.page + 1, limit: paginationModel.pageSize})
    const [banUser, {isLoading: isLoadingBan, isError: isErrorBan}] = useBanUserMutation()

    const handleAction = async (id: string) => {
        const isConfirm = confirm(`Bạn có chắc muốn cấm người dùng này`)
        if(isConfirm) {
            try {
                const response = await banUser(id).unwrap()
                if(response.status === 200) {
                    toast.success(response.data.msg)
                }
            } catch(err) {
                toast.error('sth')
            }
        }
    }

    useEffect(() => {
        if(dataJobseeker?.data?.data && !isLoadingJobseeker && !isErrorJobseeker) {
            setJobseekerList(dataJobseeker?.data?.data)
        }
    }, [dataJobseeker?.data?.data, isLoadingJobseeker, isErrorJobseeker])

    useEffect(() => {
        if(dataJobseeker?.data?.totalItems && !isLoadingJobseeker && !isErrorJobseeker) {
            setjobseekerCount(dataJobseeker?.data?.totalItems)
        }
    }, [dataJobseeker?.data?.totalItems, isLoadingJobseeker, isErrorJobseeker])

    useEffect(() => {
        setIsLoading(isLoadingBan)
    }, [isLoadingBan])

    const columns = [
        { field: 'photo', headerName: 'Ảnh', flex: 1, renderCell: (params: any) => <Avatar src={params.row.photo} /> },
        { field: 'firstName', headerName: 'Họ', flex: 1 },
        { field: 'lastName', headerName: 'Tên', flex: 2 },
        { field: 'gender', headerName: 'Giới tính', flex: 2, renderCell: (params: any) => params.row.gender === 'male' ? 'Nam' : 'Nữ'},
        { field: 'email', headerName: 'Email', flex: 3 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 2 },
        { field: 'createdAt', headerName: 'Tham gia vào ngày', flex: 2, renderCell: (params: any) => new Intl.DateTimeFormat('en-US', ).format(new Date(params.row.createdAt)) },
        { field: 'actions', headerName: 'Hành động', type: 'actions', flex: 2, renderCell: (params: any) => <UserActions params={params} onAction={handleAction} actionType="ban" title='Cấm người dùng này'/> },
    ];

    return (
        <Box sx={{marginBottom: 10, width: '100%', minHeight: 400}}>
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
                rows={jobseekerList}
                rowCount={jobseekerCount}
                pageSizeOptions={[5, 10, 25]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                paginationMode="server"
            />
        </Box>
    );
}

export default JobseekerTab;