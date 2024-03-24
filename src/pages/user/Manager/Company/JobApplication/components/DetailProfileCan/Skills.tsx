import JobSeeker from '@/types/JobSeeker';
import Title from './Title';

const Skills = ({ info }: { info?: JobSeeker }) => {
    return (
        <div className="flex flex-col gap-1">
            <Title title="Kỹ năng" />
            <div className="flex flex-wrap gap-4 text-sm">
                {info?.skills.length === 0 ? (
                    <p>Cập nhật sau!</p>
                ) : (
                    info?.skills.map((skill, index) => <div key={index}>{skill}</div>)
                )}
            </div>
        </div>
    );
};

export default Skills;
