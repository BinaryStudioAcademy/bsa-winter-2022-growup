import '../styles.scss';
import star from 'assets/img/icons/skill-icons/star.png';
import starDisable from 'assets/img/icons/skill-icons/starDisable.png';
import { useState } from 'react';
import RatingValue from './value';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { actions } from 'store/skill/slice';
import { RootState } from 'common/types/types';
import { validRating } from '../validations/rating';
import { ReactComponent as Delete } from '../../../assets/img/icons/skill-icons/delete-icon.svg';
import { ReactComponent as Save } from '../../../assets/img/icons/skill-icons/save-icon.svg';
import { ReactComponent as Edit } from '../../../assets/img/icons/skill-icons/edit-icon.svg';

interface SkillTypes {
  id: number;
  name: string;
  rating: Array<string>;
}

const column = [0, 1, 2];

const SkillElement = (props: SkillTypes): React.ReactElement => {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [ratingValues, setRatingValues] = useState([
    props.rating[0],
    props.rating[1],
    props.rating[2],
  ]);
  const [nameSkill, setNameSkill] = useState(props.name);
  const [isStar, setIsStar] = useState(false);
  const user = useAppSelector((state: RootState) => state.okr.user);
  const dispatch = useAppDispatch();

  function deleteSkill(id: number): void {
    dispatch(actions.REMOVE_SKILL(id));
  }
  function editSkill(text: string, el: number): void {
    if (validRating(text)) {
      const editRating = [...ratingValues];
      editRating[el] = text;
      setRatingValues(editRating);
    }
  }
  function saveEdits(id: number): void {
    if (isEdit) {
      dispatch(
        actions.EDIT_SKILL({
          id: id,
          name: nameSkill,
          userId: user.id,
          rating: ratingValues,
        }),
      );
    }
    setIsEdit(!isEdit);
  }

  return (
    <tr
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
    >
      <td className="align-middle container-skill-name">
        {isEdit ? (
          <input
            type="text"
            className="skill-control"
            value={nameSkill}
            onChange={(k): void => setNameSkill(k.target.value)}
          />
        ) : (
          `${props.name}`
        )}{' '}
        <button
          className="border-0 bg-gu-white sort-button"
          onClick={(): void => setIsStar(!isStar)}
        >
          {isStar ? (
            <img alt="star" src={star} />
          ) : (
            <img alt="star" src={starDisable} />
          )}
        </button>
        {isHover ? (
          <button
            className="btn btn-gu-white btn-outline-gu-black button-group"
            type="button"
            onClick={(): void => saveEdits(props.id)}
          >
            {isEdit ? <Save /> : <Edit />}
          </button>
        ) : (
          true
        )}
        {isHover ? (
          <button
            className="btn btn-gu-white btn-outline-gu-black mx-2"
            type="button"
            onClick={(): void => deleteSkill(props.id)}
          >
            <Delete />
          </button>
        ) : (
          true
        )}
      </td>
      {column.map((skill, index) => {
        return (
          <td className="skill-rating text-center align-middle" key={index}>
            {isEdit ? (
              <input
                type="text"
                className="rating-control"
                value={ratingValues[skill]}
                onChange={(k): void => editSkill(k.target.value, skill)}
              />
            ) : (
              <RatingValue value={props.rating[skill]} />
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default SkillElement;
