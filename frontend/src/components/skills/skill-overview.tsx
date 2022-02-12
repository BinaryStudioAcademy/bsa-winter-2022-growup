import { RootState } from 'common/types/types';
import { useSelector } from 'react-redux';
import SkillElement from './skill-reting';
import './styles.scss';

const SkillOverview = ():React.ReactElement => {
    const User = useSelector((state: RootState) => state.okr.User);
    const skillList = useSelector((state: RootState) => state.skill.UserSkill);

    return (
        <div>
            <div className="row skill-profile">
                <div className="col border border-purple">
                    <img src="https://e7.pngegg.com/pngimages/674/524/png-clipart-professional-computer-icons-avatar-job-avatar-heroes-computer.png" className="rounded-circle" width="80px" alt="avatar"/>
                </div>
                <div className="col border border-purple">
                    <div className="fs-2">Name Surname</div>
                    <div>Profession name</div>
                </div>
            </div>
            <div className="d-flex justify-content-around">
                <form className="row g-3">
                <div className="col-auto">
                    <label className="visually-hidden">Password</label>
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
                    {/* <th scope="col">#</th> */}
                    <th scope="col">Skill</th>
                    <th scope="col">Self Rating</th>
                    <th scope="col">Maneger Rating</th>
                    <th scope="col">Skill Review</th>
                    </tr>
                </thead>
                <tbody>
                    {skillList.map((skill: any) => {
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
