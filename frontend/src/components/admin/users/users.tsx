import { memo } from 'react';
import { Card } from 'react-bootstrap';

import { useState, useCallback } from 'hooks/hooks';

import type { IUser } from 'common/interfaces/user/index';

import UserModal from './modal/user-modal';

type PropTypes = {
  userList: IUser[];
};

const Users: React.FC<PropTypes> = ({ userList }) => {
  const [show, setShow] = useState(false);
  const closeWindow = useCallback(() => setShow(false), []);
  const showWindow = (): void => setShow(true);

  return (
    <>
      <div className="col">
        <Card className="growup-card-primary">
          <Card.Header className="d-flex justify-content-end growup-card-header">
            <button
              className="btn btn-outline-gu-white btn-hover-gu-purple fw-bold fs-5 border-2"
              onClick={showWindow}
            >
              + Add User
            </button>
          </Card.Header>
          <Card.Body>
            {userList.length ? (
              userList.map((user) => <p>{user.fullName}</p>)
            ) : (
              <p className="m-0 text-center">No users here...</p>
            )}
          </Card.Body>
        </Card>
      </div>
      <UserModal show={show} onClose={closeWindow} />
    </>
  );
};

export default memo(Users);
