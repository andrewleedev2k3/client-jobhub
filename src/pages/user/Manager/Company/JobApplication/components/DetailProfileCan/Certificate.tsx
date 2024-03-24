import JobSeeker from '@/types/JobSeeker';
import Title from './Title';
import { formatDateWithDayMonthYear } from '@/utils/date';
const Certificate = ({ info }: { info?: JobSeeker }) => {
    return (
        <div className="flex flex-col gap-1">
            <Title title="Thành tích" />
            <div className="flex flex-col gap-4">
                {info?.certificate.length === 0 ? (
                    <p className="text-sm">Cập nhật sau!</p>
                ) : (
                    info?.certificate.map((cer, index) => (
                        <div key={index} className="flex flex-col text-sm">
                            <h6 className="text-content-title font-semibold uppercase">{cer.name}</h6>
                            <h6 className="text-content-text font-medium">{cer.organization}</h6>
                            <h6 className="text-content-text text-[13px]">
                                {formatDateWithDayMonthYear(cer.date.from)}
                                {' - '}
                                {formatDateWithDayMonthYear(cer.date.to)}
                            </h6>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Certificate;
