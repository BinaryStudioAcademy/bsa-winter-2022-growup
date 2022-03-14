import { memo, forwardRef } from 'react';
import { useState } from 'hooks/hooks';

import { Dropdown } from 'react-bootstrap';
import { SortOption } from 'store/opportunities/common';

const ButtonToggle = forwardRef<HTMLButtonElement, { onClick: () => void }>(
  ({ children, onClick }, ref): JSX.Element => (
    <button
      ref={ref}
      onClick={onClick}
      className="btn btn-gu-white text-blue btn-hover-gu-purple border-2 fs-5 fw-bold"
    >
      {children}
    </button>
  ),
);

type Props = {
  onClick: (by: SortOption) => void;
};

const SortButton: React.FC<Props> = ({ onClick }) => {
  const [sort, setSort] = useState<SortOption | null>(null);

  const requestSort = (by: SortOption): void => {
    onClick(by);
    setSort(by);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as={ButtonToggle}>{sort || 'Sort'}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={(): void => requestSort(SortOption.DATE)}>
          Date
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(): void => requestSort(SortOption.ORGANIZATION)}
        >
          Organization
        </Dropdown.Item>
        <Dropdown.Item onClick={(): void => requestSort(SortOption.PROGRAM)}>
          Program
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default memo(SortButton);
