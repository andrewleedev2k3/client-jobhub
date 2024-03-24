import JobSeeker from '@/types/JobSeeker';
import Title from './Title';
import { formatDateWithDayMonthYear } from '@/utils/date';

const Projects = ({ info }: { info?: JobSeeker }) => {
    return (
        <div className="flex flex-col gap-1">
            <Title title="Dự án" />

            <div className="flex flex-col gap-4">
                {info?.projects.length === 0 ? (
                    <p className="text-sm">Cập nhật sau!</p>
                ) : (
                    info?.projects.map((project, index) => (
                        <div key={index} className="flex flex-col text-sm">
                            <h6 className="text-content-title font-semibold uppercase">{project.name}</h6>
                            <h6 className="text-content-text">{project.description}</h6>
                            <h6 className="text-content-text text-[13px]">
                                {formatDateWithDayMonthYear(project.date.from)}
                                {' - '}
                                {project.date.to ? formatDateWithDayMonthYear(project.date.to) : 'Đang làm'}
                            </h6>
                            <a className="text-sm text-primary-100 underline" href={project.url} target="_blank">
                                Link dự án
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Projects;
