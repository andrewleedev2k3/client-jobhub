import Certificate from './Certificate/Certificate';
import Educate from './Educate/Educate';
import Experience from './Experience/Experience';
import Info from './Info/Info';
import Introduce from './Introduce/Introduce';
import Projects from './Projects/Projects';
import Skill from './Skill/Skill';

const MyProfile = () => {
    return (
        <div className="flex flex-col gap-6">
            <Info />
            <Introduce />
            <Experience />
            <Skill />
            <Educate />
            <Certificate />
            <Projects />
        </div>
    );
};

export default MyProfile;
