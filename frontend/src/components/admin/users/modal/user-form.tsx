import { ChangeEvent, FormEvent, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

import { useState, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { RoleType } from 'common/enums/enums';

import { adminActions } from 'store/admin';
import { IUser } from 'common/interfaces/user/user';
import { Button } from 'components/common/common';
import { LevelsList } from 'components/admin/common';
import { careerPathActions } from 'store/career-path';

type Props = {
  onSubmit: () => void;
};

const UserForm: React.FC<Props> = ({ onSubmit: submit }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(RoleType.MENTOR);
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

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value.replace(' ', ''));

  const roleChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void =>
    setRole(e.currentTarget.value as RoleType);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const selectedLevel = levels.find((lvl) => lvl.name === level);
    dispatch(
      adminActions.inviteUser({
        email,
        role,
        level: selectedLevel
          ? { id: selectedLevel.id, name: selectedLevel.name }
          : null,
        position: selectedLevel?.name || '',
      }),
    )
      .unwrap()
      .then((res: IUser | null) => {
        if (!res) {
          NotificationManager.error('User with this email already exists');
        } else {
          NotificationManager.success('User invited successfully');
        }
      });

    setEmail('');
    setRole(RoleType.MENTOR);
    submit();
  };

  return (
    <Form className="d-flex flex-column gap-3" onSubmit={onSubmit}>
      <div className="d-flex align-items-end gap-2">
        <Form.Group className="flex-fill">
          <Form.Label>User email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={email}
            onChange={emailChangeHandler}
            placeholder="Enter email name..."
            required
          />
        </Form.Group>
        <Form.Group className="flex-fill">
          <Form.Label>User Role</Form.Label>
          <Form.Select
            aria-label="User Role select menu"
            name="role"
            onChange={roleChangeHandler}
            value={role}
          >
            <option value={RoleType.MENTOR}>Mentor</option>
            <option value={RoleType.MENTEE}>Mentee</option>
          </Form.Select>
        </Form.Group>
      </div>

      {role === RoleType.MENTEE && (
        <div className="col">
          <Form.Group className="flex-fill">
            <Form.Label>User position</Form.Label>
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
      )}
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

export default UserForm;
