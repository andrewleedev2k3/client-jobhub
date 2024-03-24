import { RootState } from '@/store/store';
import { isCompany } from '@/utils/helper';
import { useEffect, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';

const CoverPhoto = ({ formik }: { formik: any }) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [coverPhoto, setCoverPhoto] = useState<string>('');
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
        if (isCompany(currentUser)) {
            setCoverPhoto(currentUser.coverPhoto);
        } else {
            setCoverPhoto('');
        }
    }, [currentUser]);

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            {(coverPhoto || previewImage) && (
                <img src={previewImage || coverPhoto} alt="avt" className="w-80 h-32 object-cover rounded-md" />
            )}

            <div className="flex gap-6">
                <div>
                    <label
                        htmlFor="photo"
                        className="flex gap-2 items-center justify-center font-medium cursor-pointer text-primary-100"
                    >
                        <div className="text-xl">
                            <AiOutlineCamera />
                        </div>
                        Cập nhật ảnh bìa
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

export default CoverPhoto;
