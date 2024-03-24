import JobSeeker from '@/types/JobSeeker';
import Title from './Title';
import { formatDateWithDayMonthYear } from '@/utils/date';

const Educate = ({ info }: { info?: JobSeeker }) => {
    return (
        <div className="flex flex-col gap-1 text-sm">
            <Title title="Học vấn" />
            <div className="flex flex-col gap-4">
                {info?.educate.length === 0 ? (
                    <p className="text-sm">Cập nhật sau!</p>
                ) : (
                    info?.educate.map((edu, index) => (
                        <div key={index} className="flex flex-col">
                            <h6 className="text-content-title font-semibold uppercase">{edu.school}</h6>
                            <p className="text-content-text font-medium"> {edu.major}</p>
                            <h6 className="text-content-text text-[13px]">
                                {formatDateWithDayMonthYear(edu.date.from)}
                                {' - '}
                                {edu.date.to ? formatDateWithDayMonthYear(edu.date.to) : 'Đang học'}
                            </h6>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Educate;
