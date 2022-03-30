import { Tooltip } from 'react-bootstrap';
import LevelsList from './levels-list/levels-list';
import ListItem from './list-item/list-item';

export const tooltip = (isDisabled: boolean): JSX.Element => {
  return isDisabled ? (
    <Tooltip id="tooltip-disabled">Add Company first</Tooltip>
  ) : (
    <></>
  );
};

export { LevelsList, ListItem };
