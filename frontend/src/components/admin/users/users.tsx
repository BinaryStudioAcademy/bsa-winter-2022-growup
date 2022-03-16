import { memo } from 'react';
import { Card } from 'react-bootstrap';

import {
  useState,
  useCallback,
  useAppDispatch,
  useAppSelector,
  useEffect,
} from 'hooks/hooks';
import { adminActions } from 'store/actions';

import UserModal from './modal/user-modal';
import UserList from './list/user-list';
import { Button } from 'components/common/common';

const Users: React.FC = () => {
  const [show, setShow] = useState(false);
  const closeWindow = useCallback(() => setShow(false), []);
  const showWindow = (): void => setShow(true);

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(adminActions.fetchUsers());
  }, []);

  return (
    <>
      <div className="col">
        <Card className="growup-card-primary">
          <Card.Header className="d-flex justify-content-end growup-card-header">
            <Button
              themeType={
                'btn-outline-gu-white btn-hover-gu-purple fw-bold fs-5 border-2'
              }
              onSubmit={showWindow}
            >
              + Add User
            </Button>
          </Card.Header>
          <Card.Body>
            <UserList list={users} />
          </Card.Body>
        </Card>
      </div>
      <UserModal show={show} onClose={closeWindow} />
    </>
  );
};

export default memo(Users);
