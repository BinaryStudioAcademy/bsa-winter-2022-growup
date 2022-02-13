import { RootState } from 'common/types/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileHeader from './header-user';
import SkillElement from './skill-reting';
import './styles.scss';

const SkillOverview = ():React.ReactElement => {
    const User = useSelector((state: RootState) => state.okr.User);
    const skillList = useSelector((state: RootState) => state.skill.UserSkill);
    const [block] = useState([1, 2, 3, 4, 6]);

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
                    {/* <th scope="col">#</th> */}
                    <th scope="col">Skill</th>
                    <th scope="col" className="text-center">Self Rating</th>
                    <th scope="col" className="text-center">Maneger Rating</th>
                    <th scope="col" className="text-center">Skill Review</th>
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
                <div className="conteiner-proggres-bar">
                    <div className="b-progress-bar">
                        {block.map(() => <ProgressBlock/>)}
                <span className="fs-4">4</span>
        </div>
        </div>
        </div>
    );
};

const ProgressBlock = ():React.ReactElement => {
    return (
        <>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </>
    );
};

export default SkillOverview;
