import { memo } from 'react';
import { Card, OverlayTrigger } from 'react-bootstrap';

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
import { tooltip } from 'components/admin/common';

const Users: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.admin);

  const [isDisabled, setIsDisabled] = useState(true);
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();

  const closeWindow = useCallback(() => setShow(false), []);
  const showWindow = (): void => setShow(true);

  useEffect(() => {
    if (user && user.company) {
      setIsDisabled(false);
    }
  }, [user]);

  useEffect(() => {
    dispatch(adminActions.fetchUsers());
  }, []);

  return (
    <>
      <div className="col">
        <Card className="growup-card-primary">
          <Card.Header className="d-flex justify-content-end growup-card-header">
            <OverlayTrigger overlay={tooltip(isDisabled)}>
              <span className="d-inline-block">
                <Button
                  variant="outline-gu-white"
                  className="btn-hover-gu-purple"
                  onClick={showWindow}
                  disabled={isDisabled}
                >
                  + Add User
                </Button>
              </span>
            </OverlayTrigger>
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
