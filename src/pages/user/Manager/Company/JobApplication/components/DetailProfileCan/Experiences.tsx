import JobSeeker from '@/types/JobSeeker';
import Title from './Title';
import { formatDateWithDayMonthYear } from '@/utils/date';

const Experiences = ({ info }: { info?: JobSeeker }) => {
    return (
        <div className="flex flex-col gap-1">
            <Title title="Kinh nghiệm" />

            <div className="flex flex-col gap-4">
                {info?.experiences.length === 0 ? (
                    <p className="text-sm">Cập nhật sau!</p>
                ) : (
                    info?.experiences.map((exp, index) => (
                        <div key={index} className="flex flex-col text-sm">
                            <h6 className="text-content-title font-semibold uppercase">{exp.company}</h6>
                            <h6 className="text-content-text font-medium"> {exp.position}</h6>
                            <h6 className="text-content-text text-[13px]">
                                {formatDateWithDayMonthYear(exp.date.from)}
                                {' - '}
                                {exp.date.to ? formatDateWithDayMonthYear(exp.date.to) : 'Đang làm'}
                            </h6>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Experiences;
