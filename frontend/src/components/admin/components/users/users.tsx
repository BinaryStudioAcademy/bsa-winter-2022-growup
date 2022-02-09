import { memo } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import type { IUser } from 'common/interfaces/user/index';

type PropTypes = {
  userList: IUser[];
};

const Users: React.FC<PropTypes> = ({ userList }) => (
  <Col sm={12} md={12} lg={12}>
    <Card className="growup-card-primary">
      <Card.Header className="d-flex justify-content-end growup-card-header">
        <Button variant="growup-outline-white">+ Add User</Button>
      </Card.Header>
      <Card.Body>
        {userList.length ? (
          userList.map((user) => <p>{user.fullName}</p>)
        ) : (
          <p className="m-0 text-center">No users here...</p>
        )}
      </Card.Body>
    </Card>
  </Col>
);

export default memo(Users);
