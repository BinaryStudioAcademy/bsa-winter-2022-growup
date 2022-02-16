import { RootState } from 'common/types/types';
import ProfileHeader from './header-user';
import SkillElement from './rating/skill-rating';
import { ISkill } from './common/interfaces';
import './styles.scss';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { actions } from '../../store/skill/slice';
import { validSkillName } from './validations/skill-name';

const SkillOverview = (): React.ReactElement => {
    const user = useAppSelector((state: RootState) => state.okr.user);
    const skillList = useAppSelector((state: RootState) => state.skill.userSkill.filter(skill => skill.userId === user.id));
    const [textFind, setTextFind] = useState('');
    const [textAdd, setTextAdd] = useState('');
    const dispatch = useAppDispatch();

    function isFind(text: string): boolean {
        const partName = text.slice(0, textFind.length);
        return (partName.toLocaleLowerCase() === textFind.toLocaleLowerCase() || !text);
    }

    function handleSubmit(e: React.SyntheticEvent): void {
        if (validSkillName(textAdd)) {
            dispatch(actions.ADD_SKILL({
                id: new Date().getMilliseconds(),
                name: textAdd,
                userId: user.id,
                rating: ['', '', ''],
            }));
            setTextAdd('');
        }
        e.preventDefault();
    }

    return (
        <div className="skill-page m-5">
            <div className="mb-5">
                <ProfileHeader />
            </div>
            <div className="d-flex justify-content-between mb-4">
                <form className="row g-3">
                    <div className="col-auto">
                        <input type="text" className="form-control" id="inputName" placeholder="Search skill" value={textFind} onChange={(k): void => setTextFind(k.target.value)} />
                    </div>
                </form>
                <form className="d-flex" onSubmit={handleSubmit}>
                    <div className="col-auto mx-4">
                        <input type="text" className="form-control" id="inputSkill" placeholder="Enter name of the skill" value={textAdd} onChange={(k): void => setTextAdd(k.target.value)} />
                    </div>
                    <div className="col-auto">
                        <input className="btn btn-primary" type="submit" value="+ Add Skill" />
                    </div>
                </form>
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
                        if (isFind(skill.name)) return <SkillElement key={skill.id} name={skill.name} rating={skill.rating} id={skill.id} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SkillOverview;
