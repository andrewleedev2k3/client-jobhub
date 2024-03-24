import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import * as Yup from 'Yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { isJobSeeker as checkJobSeeker } from '@/utils/helper';
import { FaCheck } from 'react-icons/fa';
import { TbFileInfo } from 'react-icons/tb';
import { useJobseekerChangeMeMutation } from '@/services/jobseekerApiSlice';
import Loader from '@/components/Loader/Loader';
interface Values {
    photo: string;
}
const initialValues: Values = {
    photo: '',
};
const validation = Yup.object().shape({
    photo: Yup.string().required('Họ không được bỏ trống!'),
});
const AddCV = () => {
    const [addCV, { isLoading }] = useJobseekerChangeMeMutation();
    const currentUser = useSelector((state: RootState) => state.user.user);

    const [previewImage, setPreviewImage] = useState<string>('');
    const [cvImage, setCVImage] = useState<string>('');

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            formik.setFieldValue('photo', selectedFile);
            setPreviewImage(URL.createObjectURL(selectedFile));
        }
    };

    const handleDelete = () => {
        setPreviewImage('');
        formik.setFieldValue('photo', null);
    };

    useEffect(() => {
        const isJobSeeker = checkJobSeeker(currentUser);
        if (isJobSeeker) {
            setCVImage(currentUser.cvImage);
        }
    }, [currentUser]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                const form = new FormData();

                form.append('cvImage', values.photo);

                const res = await addCV(form).unwrap();
                if (res.status === 200) {
                    toast.success('Cập nhật CV thành công');
                }

                formik.resetForm();
            } catch (error: any) {
                if (error.status === 400) {
                    toast.error(error.data.msg);
                }
                if (error.status === 500) {
                    toast.error('Lỗi server');
                }
            }
        },
    });

    const removeCVHandler = async () => {
        const data: any = {
            cvImage: '',
        };
        const res = await addCV(data).unwrap();
        if (res.status === 200) {
            toast.success('Cập nhật CV thành công');
        }
    };
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-md shadow-lg font-family-text"
        >
            {isLoading && <Loader />}
            <div className="flex items-center gap-6 font-semibold uppercase mb:flex-col">
                <label
                    htmlFor="photo"
                    className="flex p-2 border-2 rounded-md gap-2 items-center justify-center font-medium cursor-pointer border-primary-100 text-primary-100 hover:border-black hover:text-black duration-300"
                >
                    <TbFileInfo className="text-lg" />
                    {cvImage ? 'Cập nhật' : 'Tải lên CV'}
                    <input name="photo" id="photo" className="hidden" type="file" onChange={handleFile} />
                </label>
                {!previewImage && cvImage && (
                    <button
                        type="button"
                        onClick={removeCVHandler}
                        className="flex p-2 border-2 rounded-md gap-2 items-center justify-center font-medium cursor-pointer border-red-800 text-red-800 hover:border-black hover:text-black duration-300 uppercase"
                    >
                        <MdDeleteOutline className="text-xl" />
                        Xoá CV Của Bạn
                    </button>
                )}
                {previewImage && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex p-2 border-2 rounded-md gap-2 items-center justify-center font-medium cursor-pointer border-red-800 text-red-800 hover:border-black hover:text-black duration-300 uppercase"
                    >
                        <MdDeleteOutline className="text-xl" />
                        Xoá Ảnh
                    </button>
                )}

                {previewImage && (
                    <button
                        type="submit"
                        className="p-2 bg-primary-100 flex gap-1 items-center text-white rounded-md hover:bg-black duration-300 uppercase"
                    >
                        <FaCheck />
                        Lưu
                    </button>
                )}
            </div>
            {(cvImage || previewImage) && (
                <img src={previewImage || cvImage} alt="avt" className="object-contain rounded-md" />
            )}
        </form>
    );
};

export default AddCV;
