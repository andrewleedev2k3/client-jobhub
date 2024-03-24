import { RootState } from '@/store/store';
import { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';

const AvatarSection = ({ formik }: { formik: any }) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [previewImage, setPreviewImage] = useState<string>('');

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

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <img
                src={previewImage ? previewImage : currentUser?.photo}
                alt="avt"
                className="w-24 h-24 rounded-full object-fit"
            />
            <div className="flex gap-6">
                <div>
                    <label
                        htmlFor="photo"
                        className="flex gap-2 items-center justify-center font-medium cursor-pointer text-primary-100"
                    >
                        <div className="text-xl">
                            <AiOutlineCamera />
                        </div>
                        Cập nhật ảnh đại diện
                    </label>
                    <input name="photo" id="photo" className="hidden" type="file" onChange={handleFile} />
                </div>
                {previewImage && (
                    <button type="button" onClick={handleDelete} className="flex items-center hover:text-primary-100">
                        <span className="text-xl">
                            <MdDeleteOutline />
                        </span>
                        Xoá
                    </button>
                )}
            </div>
        </div>
    );
};

export default AvatarSection;
