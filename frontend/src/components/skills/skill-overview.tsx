import { RootState } from 'common/types/types';
import ProfileHeader from './header-user';
import SkillElement from './rating/skill-rating';
import { ISkill } from './common/interfaces';
import './styles.scss';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { actions } from '../../store/skill/slice';
import { validSkillName } from './validations/skill-name';
import { ReactComponent as SortUp } from '../../assets/img/icons/skill-icons/sortUp-icon.svg';
import { ReactComponent as SortDown } from '../../assets/img/icons/skill-icons/sortDown-icon.svg';

const SkillOverview = (): React.ReactElement => {
  const user = useAppSelector((state: RootState) => state.okr.user);
  const skillList = useAppSelector((state: RootState) =>
    state.skill.userSkill.filter((skill) => skill.userId === user.id),
  );
  const [textFind, setTextFind] = useState('');
  const [textAdd, setTextAdd] = useState('');
  const [isManager, setIsManager] = useState(true);
  const [isSkillReview, setIsSkillReview] = useState(true);
  const [isSortName, setIsSortName] = useState(true);
  const [isSortSelf, setIsSortSelf] = useState(true);
  const dispatch = useAppDispatch();

  function isFind(text: string): boolean {
    const partName = text.slice(0, textFind.length);
    return (
      partName.toLocaleLowerCase() === textFind.toLocaleLowerCase() || !text
    );
  }

  function handleSubmit(e: React.SyntheticEvent): void {
    if (validSkillName(textAdd)) {
      dispatch(
        actions.ADD_SKILL({
          id: new Date().getMilliseconds(),
          name: textAdd,
          userId: user.id,
          rating: ['', '', ''],
        }),
      );
      setTextAdd('');
    }
    e.preventDefault();
  }

  function sortByName(x: ISkill, y: ISkill): number {
    let upDown;
    isSortName ? (upDown = -1) : (upDown = 1);
    if (x.name.toLocaleLowerCase() < y.name.toLocaleLowerCase()) {
      return upDown;
    }
    if (x.name.toLocaleLowerCase() > y.name.toLocaleLowerCase()) {
      return -1 * upDown;
    }
    return 0;
  }

  function sortBySelfRating(x: ISkill, y: ISkill): number {
    if (isSortSelf) {
      return +y.rating[0] - +x.rating[0];
    } else {
      return +x.rating[0] - +y.rating[0];
    }
  }
  function sortByManager(x: ISkill, y: ISkill): number {
    if (isManager) {
      return +y.rating[1] - +x.rating[1];
    } else {
      return +x.rating[1] - +y.rating[1];
    }
  }
  function sortBySkillReview(x: ISkill, y: ISkill): number {
    if (isSkillReview) {
      return +y.rating[2] - +x.rating[2];
    } else {
      return +x.rating[2] - +y.rating[2];
    }
  }

  function sortSkillNames(): void {
    const sortNames = skillList.sort(sortByName);
    setIsSortName(!isSortName);
    dispatch(actions.SORT_NAME(sortNames));
  }

  function sortSelfRating(): void {
    const sortSelfRating = skillList.sort(sortBySelfRating);
    setIsSortSelf(!isSortSelf);
    dispatch(actions.SORT_NAME(sortSelfRating));
  }

  function sortManagerRating(): void {
    const sortManager = skillList.sort(sortByManager);
    setIsManager(!isManager);
    dispatch(actions.SORT_NAME(sortManager));
  }

  function sortSkillReview(): void {
    const sortSkillReview = skillList.sort(sortBySkillReview);
    setIsSkillReview(!isSkillReview);
    dispatch(actions.SORT_NAME(sortSkillReview));
  }

  return (
    <div className="skill-page m-5">
      <div className="mb-5">
        <ProfileHeader />
      </div>
      <div className="d-flex justify-content-between mb-4">
        <form className="row g-3">
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Search skill"
              value={textFind}
              onChange={(k): void => setTextFind(k.target.value)}
            />
          </div>
        </form>
        <form className="d-flex" onSubmit={handleSubmit}>
          <div className="col-auto mx-4">
            <input
              type="text"
              className="form-control"
              id="inputSkill"
              placeholder="Enter name of the skill"
              value={textAdd}
              onChange={(k): void => setTextAdd(k.target.value)}
            />
          </div>
          <div className="col-auto">
            <input
              className="btn btn-primary"
              type="submit"
              value="+ Add Skill"
            />
          </div>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              Skill
              <button
                className="border-0 bg-gu-white sort-button"
                onClick={(): void => sortSkillNames()}
              >
                {isSortName ? <SortDown /> : <SortUp />}
              </button>
            </th>
            <th scope="col" className="text-center">
              Self Rating
              <button
                className="border-0 bg-gu-white sort-button"
                onClick={(): void => sortSelfRating()}
              >
                {isSortSelf ? <SortDown /> : <SortUp />}
              </button>
            </th>
            <th scope="col" className="text-center">
              Manager Rating
              <button
                className="border-0 bg-gu-white sort-button"
                onClick={(): void => sortManagerRating()}
              >
                {isManager ? <SortDown /> : <SortUp />}
              </button>
            </th>
            <th scope="col" className="text-center">
              Skill Review
              <button
                className="border-0 bg-gu-white sort-button"
                onClick={(): void => sortSkillReview()}
              >
                {isSkillReview ? <SortDown /> : <SortUp />}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {skillList.map((skill: ISkill) => {
            if (isFind(skill.name))
              return (
                <SkillElement
                  key={skill.id}
                  name={skill.name}
                  rating={skill.rating}
                  id={skill.id}
                />
              );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SkillOverview;
