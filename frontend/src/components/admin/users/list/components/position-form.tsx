import { ChangeEvent, FormEvent, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

import { useState, useAppDispatch, useAppSelector } from 'hooks/hooks';

import { adminActions } from 'store/admin';
import { IUser } from 'common/interfaces/user/user';
import { Button } from 'components/common/common';
import { LevelsList } from 'components/admin/common';
import { careerPathActions } from 'store/career-path';

type Props = {
  user: IUser;
  onSubmit: () => void;
};

const PositionForm: React.FC<Props> = ({ user, onSubmit: submit }) => {
  const domains = useAppSelector((state) => state.careerPath.domains) || [];
  const [domainIndex, setDomainIndex] = useState(0);
  const [level, setLevel] = useState('');

  const levels = domainIndex ? domains[domainIndex - 1]?.levels : [];

  const domainSelectHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const index = e.target.options.selectedIndex;
    setDomainIndex(index);
    setLevel('');
  };

  const levelSelectHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLevel(e.target.value);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(careerPathActions.fetchDomains());
  }, [dispatch]);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const selectedLevel = levels.find((lvl) => lvl.name === level);
    dispatch(
      adminActions.changeUserPosition({
        id: user.id,
        position: selectedLevel?.name || '',
        level: selectedLevel
          ? { id: selectedLevel.id, name: selectedLevel.name }
          : null,
      }),
    )
      .unwrap()
      .then(() => {
        NotificationManager.success('Position changed successfully');
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });

    setLevel('');
    submit();
  };

  return (
    <Form className="d-flex flex-column gap-3" onSubmit={onSubmit}>
      <div className="col">
        <Form.Group className="flex-fill">
          <Form.Select
            className="mb-2"
            onChange={(e): void => domainSelectHandler(e)}
            name="level"
            defaultValue="Without domain"
          >
            <option value="Without domain">Without domain</option>
            {domains.map((domain, i) => (
              <option key={i} value={i}>
                {domain.domain.name}
              </option>
            ))}
          </Form.Select>
          <LevelsList
            type="radio"
            levels={levels}
            onItemClick={levelSelectHandler}
          />
        </Form.Group>
      </div>
      <div className="d-flex">
        <Button
          variant="outline-gu-purple"
          className=" btn-hover-gu-white flex-fill"
          type="submit"
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default PositionForm;
