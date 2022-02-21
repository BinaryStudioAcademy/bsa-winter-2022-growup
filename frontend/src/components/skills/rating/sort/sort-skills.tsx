import { ISkill } from 'components/skills/common/interfaces';
import { useAppDispatch } from 'hooks/hooks';
import { useState } from 'react';
import { actions } from 'store/skill/slice';

const [isSortSelf, setIsSortSelf] = useState(true);
const [isSortName, setIsSortName] = useState(true);
const dispatch = useAppDispatch();

function sortByName(x: ISkill, y: ISkill): number {
  let upDown;
  isSortName ? (upDown = 1) : (upDown = -1);
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

export function sortSkillNames(skills: ISkill[]): void {
  const sortNames = skills.sort(sortByName);
  setIsSortName(!isSortName);
  dispatch(actions.SORT_NAME(sortNames));
}

export function sortSelfRating(skills: ISkill[]): void {
  const sortSelfRating = skills.sort(sortBySelfRating);
  setIsSortSelf(!isSortSelf);
  dispatch(actions.SORT_NAME(sortSelfRating));
}
