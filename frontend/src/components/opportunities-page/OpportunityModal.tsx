import { useRef } from 'react';
import { Form } from 'react-bootstrap';

import * as opportunitiesActions from 'store/opportunities/actions';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';

import { Modal } from 'components/common/common';

const OpportunityModal: React.FC = () => {
  const opportunityName = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLInputElement>(null);
  const organizationName = useRef<HTMLInputElement>(null);
  const startDate = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const isShowModal = useAppSelector(
    (state) => state.opportunities.isShowModal,
  );

  const hideModal = (): void => {
    dispatch(opportunitiesActions.closeModal());
  };
  const sendData = (): void => {
    dispatch(
      opportunitiesActions.fetchNewOpp({
        name: opportunityName.current?.value,
        type: type.current?.value,
        organization: organizationName.current?.value,
        startDate: new Date(startDate.current?.value || ''),
      }),
    );
  };
  return (
    <>
      <Modal
        show={!!isShowModal}
        title="Add New Opportunity"
        buttonText="Save Changes"
        onClose={hideModal}
        onSubmit={sendData}
        footer
      >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Opportunity Name</Form.Label>
            <Form.Control placeholder="Enter name..." ref={opportunityName} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Organization Name</Form.Label>
            <Form.Control placeholder="Enter name..." ref={organizationName} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type of Opportunity</Form.Label>
            <Form.Control placeholder="Enter type..." ref={type} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date..."
              ref={startDate}
            />
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
};

export default OpportunityModal;
