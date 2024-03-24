import { StatisticTopJob } from '@/types/Statistic';

const Job = ({ job }: { job: StatisticTopJob }) => {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="w-10 h-8 flex items-center justify-center bg-primary-100 rounded-full text-white text-lg font-title">
                {job.amountApplication}
            </span>
            <p className="text-lg font-semibold w-full">{job?.job?.title}</p>
        </div>
    );
};

export default Job;
