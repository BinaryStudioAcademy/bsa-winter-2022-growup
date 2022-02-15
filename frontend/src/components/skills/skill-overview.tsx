import { RootState } from 'common/types/types';
import { useSelector } from 'react-redux';
import ProfileHeader from './header-user';
import SkillElement from './skill-rating';
import { ISkill } from './common/interfaces';
import './styles.scss';

const SkillOverview = ():React.ReactElement => {
    const User = useSelector((state: RootState) => state.okr.user);
    const skillList = useSelector((state: RootState) => state.skill.UserSkill);

    return (
        <div className="skill-page m-5">
            <div className="mb-3">
                <ProfileHeader/>
            </div>
            <div className="d-flex justify-content-between">
                <form className="row g-3">
                <div className="col-auto">
                    <input type="text" className="form-control" id="inputPassword2" placeholder="Search skill"/>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-gu-white btn-outline-gu-black mb-3">Find</button>
                </div>
                </form>
                <div>
                    <input className="btn btn-primary" type="button" value="+ Add Skill"/>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Skill</th>
                    <th scope="col" className="text-center">Self Rating</th>
                    <th scope="col" className="text-center">Manager Rating</th>
                    <th scope="col" className="text-center">Skill Review</th>
                    </tr>
                </thead>
                <tbody>
                    {skillList.map((skill: ISkill) => {
                    if (skill.userId === User.id) {
                        return <SkillElement key={skill.id} name={skill.name}/>;
                    }
                    })}
                </tbody>
                </table>
        </div>
    );
};

export default SkillOverview;
