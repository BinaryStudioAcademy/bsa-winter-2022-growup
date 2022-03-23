import { Form } from 'react-bootstrap';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useState,
  useEffect,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { ISkill } from 'common/interfaces/skill/skill';
import ProfileHeader from './header-user';
import SkillElement from './rating/skill-rating';
import { Button, FormInput } from '../common/common';
import { ReactComponent as SortUp } from 'assets/img/icons/skill-icons/sortUp-icon.svg';
import { ReactComponent as SortDown } from 'assets/img/icons/skill-icons/sortDown-icon.svg';
import { SkillFormType } from './common/types';
import { DEFAULT_SKILL_PAYLOAD } from './common/constants';
import { actions } from 'store/skill/slice';
import { skill as skillValidationSchema } from 'validation-schemas/validation-schemas';
import { skillActions } from 'store/skill';
import { NotificationManager } from 'react-notifications';
import './styles.scss';

const SkillOverview = (): React.ReactElement => {
  const skills = useAppSelector((state: RootState) => state.skill.userSkill);
  const allSkills = useAppSelector((state: RootState) => state.skill.allSkills);
  const { user } = useAppSelector((state) => state.profile);
  const [textFind, setTextFind] = useState('');
  const [selectSkills, setSelectSkills] = useState('all');
  const [isManager, setIsManager] = useState(true);
  const [isSkillReview, setIsSkillReview] = useState(true);
  const [isSortName, setIsSortName] = useState(true);
  const [isSortSelf, setIsSortSelf] = useState(true);
  const dispatch = useAppDispatch();
  const UNIMPORTANT = 'unimportant';
  const IMPORTANT = 'important';
  const skillStarred = skills.filter((skill: ISkill) => skill.isStarred);
  const skillNotStarred = skills.filter((skill: ISkill) => !skill.isStarred);

  useEffect(() => {
    dispatch(skillActions.fetchUserSkills());
    dispatch(skillActions.fetchSkills());
  }, []);

  const { control, errors, handleSubmit, reset } = useAppForm<SkillFormType>({
    defaultValues: DEFAULT_SKILL_PAYLOAD,
    validationSchema: skillValidationSchema,
    mode: 'onSubmit',
  });

  function isFind(text: string): boolean {
    const partName = text.slice(0, textFind.length);
    return (
      partName.toLocaleLowerCase() === textFind.toLocaleLowerCase() || !text
    );
  }

  const handleAdd = (payload: ISkill): void => {
    const isName = allSkills.find((skill) => skill.name === payload.name);
    const isUserName = skills.find((skill) => skill.name === payload.name);
    if (!isUserName)
      if (!isName)
        dispatch(skillActions.createSkill([payload]))
          .unwrap()
          .catch((err) => NotificationManager.error(err.message));
      else dispatch(skillActions.connectSkill([payload]));
    else NotificationManager.error('Skill with this name already exists');
  };

  const onAdd = (values: SkillFormType): void => {
    const skill = {
      id: '',
      type: 'Soft skills',
    };
    const newSkill = { ...skill, name: values.name };
    handleAdd(newSkill);
    reset?.();
  };

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
    if (y.rating && x.rating)
      if (isSortSelf) {
        return +y.rating[0] - +x.rating[0];
      } else {
        return +x.rating[0] - +y.rating[0];
      }
    return 0;
  }

  function sortByManager(x: ISkill, y: ISkill): number {
    if (y.rating && x.rating)
      if (isManager) {
        return +y.rating[1] - +x.rating[1];
      } else {
        return +x.rating[1] - +y.rating[1];
      }
    return 0;
  }

  function sortBySkillReview(x: ISkill, y: ISkill): number {
    if (y.rating && x.rating)
      if (isSkillReview) {
        return +y.rating[2] - +x.rating[2];
      } else {
        return +x.rating[2] - +y.rating[2];
      }
    return 0;
  }

  function sortSkillNames(): void {
    const copySkills = [...skills];
    const sortNames = copySkills.sort(sortByName);
    setIsSortName(!isSortName);
    dispatch(actions.SORT_NAME(sortNames));
  }

  function sortSelfRating(): void {
    const copySkills = [...skills];
    const sortSelfRating = copySkills.sort(sortBySelfRating);
    setIsSortSelf(!isSortSelf);
    dispatch(actions.SORT_NAME(sortSelfRating));
  }

  function sortManagerRating(): void {
    const copySkills = [...skills];
    const sortManager = copySkills.sort(sortByManager);
    setIsManager(!isManager);
    dispatch(actions.SORT_NAME(sortManager));
  }

  function sortSkillReview(): void {
    const copySkills = [...skills];
    const sortSkillReview = copySkills.sort(sortBySkillReview);
    setIsSkillReview(!isSkillReview);
    dispatch(actions.SORT_NAME(sortSkillReview));
  }

  return (
    <>
      {user ? (
        <div className="mb-5">
          <ProfileHeader
            avatar={user.avatar}
            firstName={user.firstName}
            lastName={user.lastName}
            position={user.position}
          />
        </div>
      ) : (
        true
      )}
      <div className="skill-page m-5">
        <div className="d-flex justify-content-between mb-4 flex-wrap gap-3">
          <form className="row g-3">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Search skill"
                value={textFind}
                onChange={(e): void => setTextFind(e.target.value)}
              />
            </div>
          </form>
          <div className="select-favorite d-flex">
            <div className="me-3 align-self-center fs-3"> Filter </div>
            <select
              className="form-control rounded"
              onChange={(e): void => setSelectSkills(e.target.value)}
              aria-label="Default select example"
            >
              <option>All Skills</option>
              <option value={`${IMPORTANT}`}>Important Skills</option>
              <option value={`${UNIMPORTANT}`}>Unimportant Skills</option>
            </select>
          </div>
          <Form className="d-flex" onSubmit={handleSubmit(onAdd)}>
            <div className="col form-input me-4">
              <FormInput
                name={'name'}
                control={control}
                errors={errors}
                type="text"
                placeholder="Enter name of the skill"
              />
            </div>
            <div className="col-auto">
              <Button variant="gu-blue" type="submit">
                + Add Skill
              </Button>
            </div>
          </Form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                Skill
                <Button
                  className={'border-0 bg-gu-white sort-button'}
                  onClick={(): void => sortSkillNames()}
                >
                  {isSortName ? <SortDown /> : <SortUp />}
                </Button>
              </th>
              <th scope="col" className="text-center">
                Self Rating
                <Button
                  className="border-0 bg-gu-white sort-button"
                  onClick={(): void => sortSelfRating()}
                >
                  {isSortSelf ? <SortDown /> : <SortUp />}
                </Button>
              </th>
              <th scope="col" className="text-center">
                Manager Rating
                <Button
                  className="border-0 bg-gu-white sort-button"
                  onClick={(): void => sortManagerRating()}
                >
                  {isManager ? <SortDown /> : <SortUp />}
                </Button>
              </th>
              <th scope="col" className="text-center">
                Skill Review
                <Button
                  className="border-0 bg-gu-white sort-button"
                  onClick={(): void => sortSkillReview()}
                >
                  {isSkillReview ? <SortDown /> : <SortUp />}
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {skills
              ? skillStarred.map((skill: ISkill) => {
                  if (skill.name && selectSkills !== UNIMPORTANT)
                    if (isFind(skill.name) && skill.rating)
                      return (
                        <SkillElement
                          key={skill.id}
                          name={skill.name}
                          rating={skill.rating}
                          id={skill.id}
                          isStarred={skill.isStarred}
                        />
                      );
                })
              : true}
            {skills
              ? skillNotStarred.map((skill: ISkill) => {
                  if (skill.name && selectSkills !== IMPORTANT)
                    if (isFind(skill.name) && skill.rating)
                      return (
                        <SkillElement
                          key={skill.id}
                          name={skill.name}
                          rating={skill.rating}
                          id={skill.id}
                          isStarred={skill.isStarred}
                        />
                      );
                })
              : true}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SkillOverview;
