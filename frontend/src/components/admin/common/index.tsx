import { Tooltip } from 'react-bootstrap';

export const tooltip = (isDisabled: boolean): JSX.Element => {
  return isDisabled ? (
    <Tooltip id="tooltip-disabled">Add Company first</Tooltip>
  ) : (
    <></>
  );
};
