import JobSeeker from '@/types/JobSeeker';
import Title from './Title';

const Introduce = ({ info }: { info?: JobSeeker }) => {
    return (
        <div className="flex flex-col gap-1">
            <Title title="Giới thiệu" />
            <div className="text-content-text text-sm whitespace-pre-line">
                {info?.introduce ? info.introduce : 'Cập nhật sau!'}
            </div>
        </div>
    );
};

export default Introduce;
