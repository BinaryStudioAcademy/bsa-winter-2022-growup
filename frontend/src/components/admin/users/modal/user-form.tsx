import { ChangeEvent, FormEvent } from 'react';
import { Form } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

import { useState, useAppDispatch } from 'hooks/hooks';
import { RoleType } from 'common/enums/enums';

import { adminActions } from 'store/admin';
import { Button } from 'components/common/common';

type Props = {
  onSubmit: () => void;
};

const UserForm: React.FC<Props> = ({ onSubmit: submit }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(RoleType.MENTOR);
  const dispatch = useAppDispatch();

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value.replace(' ', ''));

  const roleChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void =>
    setRole(e.currentTarget.value as RoleType);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();

    dispatch(
      adminActions.inviteUser({
        email,
        roleType: role,
      }),
    )
      .unwrap()
      .then(() => {
        NotificationManager.success('User invited successfully');
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
      <div className="d-flex">
        <Button
          className={
            'btn btn-outline-gu-purple btn-hover-gu-white fw-bold fs-5 border-2 flex-fill'
          }
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
